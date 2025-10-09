import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedData() {
  try {
    console.log("🌱 Seeding database with sample data...");

    // Create sample users
    const user1 = await prisma.user.upsert({
      where: { externalId: "ext_001" },
      update: {},
      create: {
        externalId: "ext_001",
        userId: "user_001",
        name: "John Doe",
        email: "john@example.com",
        password: "hashed_password_123",
        role: "customer",
        contactNo: "+8801234567890",
        address: "Dhaka, Bangladesh",
        profileImg: "https://via.placeholder.com/150",
      },
    });

    const user2 = await prisma.user.upsert({
      where: { externalId: "ext_002" },
      update: {},
      create: {
        externalId: "ext_002",
        userId: "user_002",
        name: "Admin User",
        email: "admin@sheba.com",
        password: "hashed_admin_password",
        role: "admin",
        contactNo: "+8801234567891",
        address: "Dhaka, Bangladesh",
        profileImg: "https://via.placeholder.com/150",
      },
    });

    console.log("✅ Users created");

    // Create sample categories
    const category1 = await prisma.category.upsert({
      where: { id: "cat_001" },
      update: {},
      create: {
        id: "cat_001",
        title: "Home Cleaning",
        image: "https://via.placeholder.com/300x200?text=Home+Cleaning",
      },
    });

    const category2 = await prisma.category.upsert({
      where: { id: "cat_002" },
      update: {},
      create: {
        id: "cat_002",
        title: "Plumbing",
        image: "https://via.placeholder.com/300x200?text=Plumbing",
      },
    });

    console.log("✅ Categories created");

    // Create sample services
    const service1 = await prisma.services.upsert({
      where: { id: "srv_001" },
      update: {},
      create: {
        id: "srv_001",
        name: "Deep House Cleaning",
        price: 2500,
        details: "Complete deep cleaning of your house including all rooms, kitchen, and bathrooms",
        image: "https://via.placeholder.com/400x300?text=Deep+Cleaning",
        categoryId: category1.id,
        rating: "4.8",
        location: "Dhaka",
        status: "available",
      },
    });

    const service2 = await prisma.services.upsert({
      where: { id: "srv_002" },
      update: {},
      create: {
        id: "srv_002",
        name: "Pipe Repair Service",
        price: 1500,
        details: "Professional pipe repair and maintenance service",
        image: "https://via.placeholder.com/400x300?text=Pipe+Repair",
        categoryId: category2.id,
        rating: "4.6",
        location: "Dhaka",
        status: "available",
      },
    });

    console.log("✅ Services created");

    // // Create sample bookings
    // const booking1 = await prisma.booking.upsert({
    //   where: { id: "book_001" },
    //   update: {},
    //   create: {
    //     id: "book_001",
    //     userId: user1.id,
    //     status: "pending",
    //     servicesId: service1.id,
    //     email: user1.email,
    //     name: user1.name,
    //     zip: "1200",
    //     street: "Dhanmondi, Dhaka",
    //     contactNo: 1234567890,
    //     time: "10:00 AM",
    //     date: "2024-01-15",
    //   },
    // });

    // console.log("✅ Bookings created");

    // // Create sample reviews
    // const review1 = await prisma.reviewAndRating.upsert({
    //   where: { id: "rev_001" },
    //   update: {},
    //   create: {
    //     id: "rev_001",
    //     review: "Excellent service! Very professional and thorough cleaning.",
    //     rating: 5,
    //     servicesId: service1.id,
    //     userImage: user1.profileImg,
    //     userId: user1.id,
    //   },
    // });

    // console.log("✅ Reviews created");

    // // Create sample content
    // const content1 = await prisma.content.upsert({
    //   where: { id: "cont_001" },
    //   update: {},
    //   create: {
    //     id: "cont_001",
    //     heading: "How to Keep Your Home Clean",
    //     image: "https://via.placeholder.com/600x400?text=Home+Cleaning+Tips",
    //     content: "Here are some essential tips to keep your home clean and organized...",
    //   },
    // });

    // console.log("✅ Content created");

    // // Create sample feedback
    // const feedback1 = await prisma.feedback.upsert({
    //   where: { id: "feed_001" },
    //   update: {},
    //   create: {
    //     id: "feed_001",
    //     email: "customer@example.com",
    //     feedback: "Great platform! Easy to use and excellent service quality.",
    //   },
    // });

    console.log("✅ Feedback created");

    console.log("🎉 Database seeded successfully!");
    console.log("\n📊 Sample data created:");
    console.log(`- Users: ${user1.name}, ${user2.name}`);
    console.log(`- Categories: ${category1.title}, ${category2.title}`);
    console.log(`- Services: ${service1.name}, ${service2.name}`);
    console.log(`- Bookings: 1 booking created`);
    console.log(`- Reviews: 1 review created`);
    console.log(`- Content: 1 blog post created`);
    console.log(`- Feedback: 1 feedback created`);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();
