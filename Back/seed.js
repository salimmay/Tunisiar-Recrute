const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Import models
const User = require('./models/user');
const InternshipOffer = require('./models/internshipOffer');
const QuizQuestion = require('./models/quizQuestion');
const QuizResult = require('./models/quizResult');
const Application = require('./models/application');
const Workshop = require('./models/workshops');

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('❌ MONGODB_URI is not defined in .env file');
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Seed function
async function seedDatabase() {
  try {
    // Clear existing data
    console.log('\n🗑️  Clearing existing data...');
    await User.deleteMany({});
    await InternshipOffer.deleteMany({});
    await QuizQuestion.deleteMany({});
    await QuizResult.deleteMany({});
    await Application.deleteMany({});
    await Workshop.deleteMany({});
    console.log('✅ Cleared all collections');

    // Hash password for all users
    const hashedPassword = await bcrypt.hash('password123', 10);

    // 1. Create Users
    console.log('\n👥 Creating users...');
    const users = await User.insertMany([
      {
        email: 'admin@tunisiar.com',
        firstname: 'Ahmed',
        lastname: 'Ben Salem',
        role: 'administrator',
        password: hashedPassword,
        supervisedInterns: []
      },
      {
        email: 'coordinator@tunisiar.com',
        firstname: 'Fatma',
        lastname: 'Gharbi',
        role: 'internship coordinator',
        password: hashedPassword,
        supervisedInterns: []
      },
      {
        email: 'supervisor@tunisiar.com',
        firstname: 'Mohamed',
        lastname: 'Trabelsi',
        role: 'supervisor',
        password: hashedPassword,
        supervisedInterns: []
      },
      {
        email: 'intern@tunisiar.com',
        firstname: 'Salma',
        lastname: 'Bouazizi',
        role: 'intern',
        password: hashedPassword,
        supervisedInterns: []
      }
    ]);
    console.log(`✅ Created ${users.length} users`);
    const [admin, coordinator, supervisor, intern] = users;

    // 2. Create Internship Offers
    console.log('\n💼 Creating internship offers...');
    const offers = await InternshipOffer.insertMany([
      {
        title: 'Software Development Internship',
        department: 'Engineering',
        location: 'Tunis, Tunisia',
        description: 'Join our engineering team to work on cutting-edge web applications using React, Node.js, and MongoDB. You will collaborate with experienced developers and contribute to real-world projects.',
        icon: '💻'
      },
      {
        title: 'Data Science Internship',
        department: 'Analytics',
        location: 'Sfax, Tunisia',
        description: 'Work with our data science team to analyze large datasets, build predictive models, and create data visualizations. Experience with Python, pandas, and machine learning is a plus.',
        icon: '📊'
      },
      {
        title: 'UI/UX Design Internship',
        department: 'Design',
        location: 'Sousse, Tunisia',
        description: 'Help design beautiful and intuitive user interfaces for our web and mobile applications. You will work closely with product managers and developers to create exceptional user experiences.',
        icon: '🎨'
      }
    ]);
    console.log(`✅ Created ${offers.length} internship offers`);
    const [softwareOffer, dataOffer, designOffer] = offers;

    // 3. Create Quiz Questions
    console.log('\n❓ Creating quiz questions...');
    const questions = await QuizQuestion.insertMany([
      // Software Development Questions
      {
        questionText: 'What does REST stand for in web development?',
        options: ['Representational State Transfer', 'Remote Execution State Transfer', 'Rapid Execution Service Technology', 'Resource Execution State Technology'],
        correctOption: 'Representational State Transfer',
        internshipOffer: softwareOffer._id
      },
      {
        questionText: 'Which of the following is NOT a JavaScript framework?',
        options: ['React', 'Angular', 'Django', 'Vue.js'],
        correctOption: 'Django',
        internshipOffer: softwareOffer._id
      },
      {
        questionText: 'What is the purpose of MongoDB in the MERN stack?',
        options: ['Frontend framework', 'Database', 'Server runtime', 'CSS framework'],
        correctOption: 'Database',
        internshipOffer: softwareOffer._id
      },
      // Data Science Questions
      {
        questionText: 'Which Python library is primarily used for data manipulation and analysis?',
        options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
        correctOption: 'Pandas',
        internshipOffer: dataOffer._id
      },
      {
        questionText: 'What does SQL stand for?',
        options: ['Structured Query Language', 'Simple Question Language', 'Standard Query Logic', 'System Quality Language'],
        correctOption: 'Structured Query Language',
        internshipOffer: dataOffer._id
      },
      {
        questionText: 'Which algorithm is commonly used for classification tasks?',
        options: ['K-means', 'Linear Regression', 'Decision Tree', 'PCA'],
        correctOption: 'Decision Tree',
        internshipOffer: dataOffer._id
      },
      // UI/UX Design Questions
      {
        questionText: 'What does UX stand for?',
        options: ['User Experience', 'User Extension', 'Universal Experience', 'Unified Extension'],
        correctOption: 'User Experience',
        internshipOffer: designOffer._id
      },
      {
        questionText: 'Which tool is commonly used for creating wireframes and prototypes?',
        options: ['Photoshop', 'Figma', 'Excel', 'PowerPoint'],
        correctOption: 'Figma',
        internshipOffer: designOffer._id
      },
      {
        questionText: 'What is the primary purpose of A/B testing in UX design?',
        options: ['Testing server performance', 'Comparing two design versions', 'Checking browser compatibility', 'Validating code quality'],
        correctOption: 'Comparing two design versions',
        internshipOffer: designOffer._id
      }
    ]);
    console.log(`✅ Created ${questions.length} quiz questions`);

    // 4. Create Applications
    console.log('\n📝 Creating applications...');
    const sampleResume = Buffer.from('This is a sample resume for the internship application. Education: Computer Science, University of Tunis. Skills: JavaScript, React, Node.js, MongoDB.');
    const sampleCoverLetter = Buffer.from('Dear Hiring Manager, I am writing to express my strong interest in the internship position at Tunisiar. I am passionate about technology and eager to learn.');

    const applications = await Application.insertMany([
      {
        firstName: 'Salma',
        lastName: 'Bouazizi',
        university: 'University of Tunis El Manar',
        email: 'intern@tunisiar.com',
        phoneNumber: '+216 20 123 456',
        coverLetter: sampleCoverLetter,
        resume: sampleResume,
        aboutYourself: 'I am a passionate computer science student with a strong interest in web development and modern technologies.',
        internshipOfferId: softwareOffer._id.toString(),
        status: 'accepted',
        supervisionStatus: 'approved',
        userId: intern._id.toString()
      },
      {
        firstName: 'Youssef',
        lastName: 'Mansour',
        university: 'University of Sfax',
        email: 'youssef.mansour@email.com',
        phoneNumber: '+216 22 234 567',
        coverLetter: sampleCoverLetter,
        resume: sampleResume,
        aboutYourself: 'Data enthusiast with experience in Python and statistical analysis.',
        internshipOfferId: dataOffer._id.toString(),
        status: 'pending',
        supervisionStatus: 'pending',
        userId: intern._id.toString()
      },
      {
        firstName: 'Amira',
        lastName: 'Kacem',
        university: 'University of Sousse',
        email: 'amira.kacem@email.com',
        phoneNumber: '+216 24 345 678',
        coverLetter: sampleCoverLetter,
        resume: sampleResume,
        aboutYourself: 'Creative designer with a passion for creating beautiful and functional user interfaces.',
        internshipOfferId: designOffer._id.toString(),
        status: 'accepted',
        supervisionStatus: 'pending',
        userId: intern._id.toString()
      }
    ]);
    console.log(`✅ Created ${applications.length} applications`);

    // 5. Create Quiz Results
    console.log('\n📊 Creating quiz results...');
    const softwareQuestions = questions.slice(0, 3);
    const dataQuestions = questions.slice(3, 6);
    const designQuestions = questions.slice(6, 9);

    const quizResults = await QuizResult.insertMany([
      {
        internId: intern._id,
        score: 3,
        answers: [
          {
            user: intern._id,
            internshipOffer: softwareOffer._id,
            questionId: softwareQuestions[0]._id,
            givenAnswer: 'Representational State Transfer',
            isCorrect: true
          },
          {
            user: intern._id,
            internshipOffer: softwareOffer._id,
            questionId: softwareQuestions[1]._id,
            givenAnswer: 'Django',
            isCorrect: true
          },
          {
            user: intern._id,
            internshipOffer: softwareOffer._id,
            questionId: softwareQuestions[2]._id,
            givenAnswer: 'Database',
            isCorrect: true
          }
        ]
      },
      {
        internId: intern._id,
        score: 2,
        answers: [
          {
            user: intern._id,
            internshipOffer: dataOffer._id,
            questionId: dataQuestions[0]._id,
            givenAnswer: 'Pandas',
            isCorrect: true
          },
          {
            user: intern._id,
            internshipOffer: dataOffer._id,
            questionId: dataQuestions[1]._id,
            givenAnswer: 'Structured Query Language',
            isCorrect: true
          },
          {
            user: intern._id,
            internshipOffer: dataOffer._id,
            questionId: dataQuestions[2]._id,
            givenAnswer: 'K-means',
            isCorrect: false
          }
        ]
      },
      {
        internId: intern._id,
        score: 3,
        answers: [
          {
            user: intern._id,
            internshipOffer: designOffer._id,
            questionId: designQuestions[0]._id,
            givenAnswer: 'User Experience',
            isCorrect: true
          },
          {
            user: intern._id,
            internshipOffer: designOffer._id,
            questionId: designQuestions[1]._id,
            givenAnswer: 'Figma',
            isCorrect: true
          },
          {
            user: intern._id,
            internshipOffer: designOffer._id,
            questionId: designQuestions[2]._id,
            givenAnswer: 'Comparing two design versions',
            isCorrect: true
          }
        ]
      }
    ]);
    console.log(`✅ Created ${quizResults.length} quiz results`);

    // 6. Create Workshops
    console.log('\n🎓 Creating workshops...');
    const workshops = await Workshop.insertMany([
      {
        title: 'Introduction to Agile Development',
        description: 'Learn the fundamentals of Agile methodology and how to apply it in software development projects.',
        date: new Date('2025-12-15T10:00:00'),
        supervisor: supervisor._id,
        attendees: [intern._id],
        meetLink: 'https://meet.google.com/abc-defg-hij'
      },
      {
        title: 'Best Practices in Code Review',
        description: 'Discover effective code review techniques and how to provide constructive feedback to your team members.',
        date: new Date('2025-12-20T14:00:00'),
        supervisor: supervisor._id,
        attendees: [intern._id],
        meetLink: 'https://meet.google.com/xyz-uvwx-rst'
      },
      {
        title: 'Career Development Workshop',
        description: 'Explore career paths in tech, build your professional network, and learn how to prepare for technical interviews.',
        date: new Date('2025-12-28T09:00:00'),
        supervisor: supervisor._id,
        attendees: [intern._id],
        meetLink: 'https://meet.google.com/lmn-opqr-stu'
      }
    ]);
    console.log(`✅ Created ${workshops.length} workshops`);

    // Update supervisor's supervisedInterns
    console.log('\n🔗 Updating supervisor relationships...');
    await User.findByIdAndUpdate(supervisor._id, {
      supervisedInterns: [intern._id]
    });
    console.log('✅ Updated supervisor relationships');

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('🎉 Database seeding completed successfully!');
    console.log('='.repeat(50));
    console.log(`📊 Summary:`);
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Internship Offers: ${offers.length}`);
    console.log(`   - Quiz Questions: ${questions.length}`);
    console.log(`   - Applications: ${applications.length}`);
    console.log(`   - Quiz Results: ${quizResults.length}`);
    console.log(`   - Workshops: ${workshops.length}`);
    console.log('='.repeat(50));
    console.log('\n💡 Test Credentials:');
    console.log('   Email: admin@tunisiar.com');
    console.log('   Email: coordinator@tunisiar.com');
    console.log('   Email: supervisor@tunisiar.com');
    console.log('   Email: intern@tunisiar.com');
    console.log('   Password (all): password123');
    console.log('='.repeat(50) + '\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
