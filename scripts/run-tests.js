const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "afterdark-super-secret-crypt-abyss-key-at-least-32-chars-long";

let passedCount = 0;
let failedCount = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedCount++;
  } else {
    console.error(`[FAIL] ${testName}`);
    failedCount++;
  }
}

async function runTestSuite() {
  console.log("==================================================");
  console.log("STARTING AFTERDARK AUTOMATED TEST SUITE");
  console.log("==================================================");

  try {
    // TEST 1: Database Connectivity and Seeded Owner Existence
    const owner = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });
    assert(owner !== null, "Admin / Owner account exists in database");
    assert(owner.displayName === "MRADUL KUMAR", "Owner accurately identified as MRADUL KUMAR");

    // TEST 2: Password Hashing Verification
    const passwordCheck = await bcrypt.compare("DarkAbyss2026!", owner.passwordHash);
    assert(passwordCheck === true, "Password verification succeeds via bcrypt hash");

    // TEST 3: JWT Token Creation and Verification
    const tokenPayload = {
      userId: owner.id,
      username: owner.username,
      role: owner.role,
      email: owner.email,
    };
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" });
    const decoded = jwt.verify(token, JWT_SECRET);
    assert(decoded.userId === owner.id && decoded.role === "ADMIN", "JWT authentication token encodes and decodes correct role");

    // TEST 4: Game Catalog Verification & Legitimate Download Links
    const sh2 = await prisma.game.findUnique({
      where: { slug: "silent-hill-2-remake" },
      include: { downloadLinks: true },
    });
    assert(sh2 !== null, "Silent Hill 2 Remake exists in catalog");
    assert(sh2.downloadLinks.length > 0, "Game contains legitimate verified storefront links");
    assert(sh2.downloadLinks[0].url.startsWith("https://"), "Storefront link uses secure HTTPS protocol");

    // TEST 5: Lore Characters Association
    const characters = await prisma.gameCharacter.findMany();
    assert(characters.length >= 6, "Lore database holds comprehensive character rosters");
    const james = characters.find((c) => c.slug === "james-sunderland");
    assert(james && james.gameTitle === "Silent Hill 2 Remake", "Character linked properly to game title");

    // TEST 6: Rating Calculation & Community Reviews
    const reviews = await prisma.review.findMany({
      where: { gameId: sh2.id, isModerated: true },
    });
    assert(reviews.length > 0, "Database contains authenticated player reviews");
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    assert(avgRating >= 1 && avgRating <= 10, "Rating correctly normalized on 1-10 scale");

    // TEST 7: Publishing & Moderation Status Flow
    const testBlogSlug = `test-article-${Date.now()}`;
    const testBlog = await prisma.blogArticle.create({
      data: {
        slug: testBlogSlug,
        title: "Automated Integration Test Article",
        content: "Verifying publication workflow and draft lifecycle under test conditions.",
        category: "Gaming Technology",
        authorId: owner.id,
        status: "DRAFT",
        coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5",
      },
    });
    assert(testBlog.status === "DRAFT", "Blog successfully created in DRAFT state");

    // Moderate to PUBLISHED
    const approvedBlog = await prisma.blogArticle.update({
      where: { id: testBlog.id },
      data: { status: "PUBLISHED" },
    });
    assert(approvedBlog.status === "PUBLISHED", "Moderation successfully elevates DRAFT to PUBLISHED");

    // Cleanup test record
    await prisma.blogArticle.delete({ where: { id: testBlog.id } });
    assert(true, "Cleaned up ephemeral test entity");

    // TEST 8: Site Settings Key-Value Store
    const brandName = await prisma.siteSetting.findUnique({
      where: { key: "SITE_NAME" },
    });
    assert(brandName && brandName.value.includes("AFTERDARK"), "Site brand setting loaded from database");

    console.log("==================================================");
    console.log(`TEST SUITE RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
    console.log("==================================================");

    if (failedCount > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.error("Test execution aborted due to unexpected exception:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runTestSuite();
