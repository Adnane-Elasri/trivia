const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

const sampleQuestions = [
  // General Knowledge - 10 Questions
  {
    category: 'General Knowledge',
    difficulty: 'easy',
    question: 'What is the capital of France?',
    correctAnswer: 'Paris',
    incorrectAnswers: ['London', 'Berlin', 'Madrid']
  },
  {
    category: 'General Knowledge',
    difficulty: 'easy',
    question: 'Which planet is known as the Red Planet?',
    correctAnswer: 'Mars',
    incorrectAnswers: ['Venus', 'Jupiter', 'Saturn']
  },
  {
    category: 'General Knowledge',
    difficulty: 'easy',
    question: 'What is 2 + 2?',
    correctAnswer: '4',
    incorrectAnswers: ['3', '5', '6']
  },
  {
    category: 'General Knowledge',
    difficulty: 'easy',
    question: 'What is the largest mammal?',
    correctAnswer: 'Blue Whale',
    incorrectAnswers: ['Elephant', 'Giraffe', 'Hippopotamus']
  },
  {
    category: 'General Knowledge',
    difficulty: 'easy',
    question: 'How many sides does a triangle have?',
    correctAnswer: '3',
    incorrectAnswers: ['4', '5', '6']
  },
  {
    category: 'General Knowledge',
    difficulty: 'medium',
    question: 'Who wrote "Romeo and Juliet"?',
    correctAnswer: 'William Shakespeare',
    incorrectAnswers: ['Charles Dickens', 'Jane Austen', 'Mark Twain']
  },
  {
    category: 'General Knowledge',
    difficulty: 'medium',
    question: 'What is the chemical symbol for gold?',
    correctAnswer: 'Au',
    incorrectAnswers: ['Ag', 'Fe', 'Cu']
  },
  {
    category: 'General Knowledge',
    difficulty: 'medium',
    question: 'Which ocean is the largest?',
    correctAnswer: 'Pacific Ocean',
    incorrectAnswers: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean']
  },
  {
    category: 'General Knowledge',
    difficulty: 'hard',
    question: 'What year was the first iPhone released?',
    correctAnswer: '2007',
    incorrectAnswers: ['2005', '2008', '2010']
  },
  {
    category: 'General Knowledge',
    difficulty: 'hard',
    question: 'Who painted the Mona Lisa?',
    correctAnswer: 'Leonardo da Vinci',
    incorrectAnswers: ['Pablo Picasso', 'Vincent van Gogh', 'Michelangelo']
  },

  // Science - 10 Questions
  {
    category: 'Science',
    difficulty: 'easy',
    question: 'What is H2O?',
    correctAnswer: 'Water',
    incorrectAnswers: ['Oxygen', 'Hydrogen', 'Carbon Dioxide']
  },
  {
    category: 'Science',
    difficulty: 'easy',
    question: 'What is the closest planet to the Sun?',
    correctAnswer: 'Mercury',
    incorrectAnswers: ['Venus', 'Earth', 'Mars']
  },
  {
    category: 'Science',
    difficulty: 'easy',
    question: 'What gas do plants absorb from the atmosphere?',
    correctAnswer: 'Carbon Dioxide',
    incorrectAnswers: ['Oxygen', 'Nitrogen', 'Hydrogen']
  },
  {
    category: 'Science',
    difficulty: 'medium',
    question: 'What is the smallest unit of life?',
    correctAnswer: 'Cell',
    incorrectAnswers: ['Atom', 'Molecule', 'Organ']
  },
  {
    category: 'Science',
    difficulty: 'medium',
    question: 'What is the chemical symbol for silver?',
    correctAnswer: 'Ag',
    incorrectAnswers: ['Au', 'Si', 'Sr']
  },
  {
    category: 'Science',
    difficulty: 'medium',
    question: 'Which scientist proposed the theory of relativity?',
    correctAnswer: 'Albert Einstein',
    incorrectAnswers: ['Isaac Newton', 'Stephen Hawking', 'Niels Bohr']
  },
  {
    category: 'Science',
    difficulty: 'hard',
    question: 'What is the atomic number of carbon?',
    correctAnswer: '6',
    incorrectAnswers: ['12', '14', '8']
  },
  {
    category: 'Science',
    difficulty: 'hard',
    question: 'Which subatomic particle has a positive charge?',
    correctAnswer: 'Proton',
    incorrectAnswers: ['Electron', 'Neutron', 'Photon']
  },
  {
    category: 'Science',
    difficulty: 'hard',
    question: 'What is the speed of light in vacuum?',
    correctAnswer: '299,792 km/s',
    incorrectAnswers: ['150,000 km/s', '450,000 km/s', '100,000 km/s']
  },
  {
    category: 'Science',
    difficulty: 'hard',
    question: 'Which vitamin is produced when your skin is exposed to sunlight?',
    correctAnswer: 'Vitamin D',
    incorrectAnswers: ['Vitamin A', 'Vitamin C', 'Vitamin K']
  },

  // History - 10 Questions
  {
    category: 'History',
    difficulty: 'easy',
    question: 'In which year did World War II end?',
    correctAnswer: '1945',
    incorrectAnswers: ['1918', '1939', '1941']
  },
  {
    category: 'History',
    difficulty: 'easy',
    question: 'Who was the first President of the United States?',
    correctAnswer: 'George Washington',
    incorrectAnswers: ['Thomas Jefferson', 'Abraham Lincoln', 'John Adams']
  },
  {
    category: 'History',
    difficulty: 'easy',
    question: 'Which ancient civilization built the pyramids?',
    correctAnswer: 'Egyptians',
    incorrectAnswers: ['Greeks', 'Romans', 'Mayans']
  },
  {
    category: 'History',
    difficulty: 'medium',
    question: 'When did the French Revolution begin?',
    correctAnswer: '1789',
    incorrectAnswers: ['1776', '1799', '1812']
  },
  {
    category: 'History',
    difficulty: 'medium',
    question: 'Who was the leader of the Soviet Union during World War II?',
    correctAnswer: 'Joseph Stalin',
    incorrectAnswers: ['Vladimir Lenin', 'Nikita Khrushchev', 'Mikhail Gorbachev']
  },
  {
    category: 'History',
    difficulty: 'medium',
    question: 'Which empire was ruled by Julius Caesar?',
    correctAnswer: 'Roman Empire',
    incorrectAnswers: ['Greek Empire', 'Egyptian Empire', 'Persian Empire']
  },
  {
    category: 'History',
    difficulty: 'hard',
    question: 'What year did the Berlin Wall fall?',
    correctAnswer: '1989',
    incorrectAnswers: ['1985', '1991', '1979']
  },
  {
    category: 'History',
    difficulty: 'hard',
    question: 'Who was the first female Prime Minister of the United Kingdom?',
    correctAnswer: 'Margaret Thatcher',
    incorrectAnswers: ['Theresa May', 'Queen Elizabeth I', 'Angela Merkel']
  },
  {
    category: 'History',
    difficulty: 'hard',
    question: 'Which ancient wonder was located in Babylon?',
    correctAnswer: 'Hanging Gardens',
    incorrectAnswers: ['Great Pyramid', 'Colossus of Rhodes', 'Temple of Artemis']
  },
  {
    category: 'History',
    difficulty: 'hard',
    question: 'What was the name of the ship that brought the Pilgrims to America?',
    correctAnswer: 'Mayflower',
    incorrectAnswers: ['Santa Maria', 'Nina', 'Titanic']
  },

  // Geography - 10 Questions
  {
    category: 'Geography',
    difficulty: 'easy',
    question: 'What is the longest river in the world?',
    correctAnswer: 'Nile',
    incorrectAnswers: ['Amazon', 'Mississippi', 'Yangtze']
  },
  {
    category: 'Geography',
    difficulty: 'easy',
    question: 'Which continent is the largest by area?',
    correctAnswer: 'Asia',
    incorrectAnswers: ['Africa', 'North America', 'Europe']
  },
  {
    category: 'Geography',
    difficulty: 'easy',
    question: 'What is the capital of Japan?',
    correctAnswer: 'Tokyo',
    incorrectAnswers: ['Seoul', 'Beijing', 'Osaka']
  },
  {
    category: 'Geography',
    difficulty: 'medium',
    question: 'Which country has the most natural lakes?',
    correctAnswer: 'Canada',
    incorrectAnswers: ['Russia', 'USA', 'China']
  },
  {
    category: 'Geography',
    difficulty: 'medium',
    question: 'What is the smallest country in the world?',
    correctAnswer: 'Vatican City',
    incorrectAnswers: ['Monaco', 'San Marino', 'Liechtenstein']
  },
  {
    category: 'Geography',
    difficulty: 'medium',
    question: 'Which desert is the largest in the world?',
    correctAnswer: 'Sahara',
    incorrectAnswers: ['Gobi', 'Arabian', 'Kalahari']
  },
  {
    category: 'Geography',
    difficulty: 'hard',
    question: 'What is the capital of Australia?',
    correctAnswer: 'Canberra',
    incorrectAnswers: ['Sydney', 'Melbourne', 'Perth']
  },
  {
    category: 'Geography',
    difficulty: 'hard',
    question: 'Which mountain range separates Europe from Asia?',
    correctAnswer: 'Ural Mountains',
    incorrectAnswers: ['Alps', 'Himalayas', 'Andes']
  },
  {
    category: 'Geography',
    difficulty: 'hard',
    question: 'What is the deepest ocean trench?',
    correctAnswer: 'Mariana Trench',
    incorrectAnswers: ['Puerto Rico Trench', 'Java Trench', 'South Sandwich Trench']
  },
  {
    category: 'Geography',
    difficulty: 'hard',
    question: 'Which country is known as the Land of the Rising Sun?',
    correctAnswer: 'Japan',
    incorrectAnswers: ['China', 'South Korea', 'Thailand']
  },

  // Entertainment - 10 Questions
  {
    category: 'Entertainment',
    difficulty: 'easy',
    question: 'Who played Iron Man in the Marvel movies?',
    correctAnswer: 'Robert Downey Jr.',
    incorrectAnswers: ['Chris Evans', 'Chris Hemsworth', 'Mark Ruffalo']
  },
  {
    category: 'Entertainment',
    difficulty: 'easy',
    question: 'Which movie features a character named Simba?',
    correctAnswer: 'The Lion King',
    incorrectAnswers: ['Aladdin', 'Finding Nemo', 'Toy Story']
  },
  {
    category: 'Entertainment',
    difficulty: 'easy',
    question: 'What is the name of the wizard in The Lord of the Rings?',
    correctAnswer: 'Gandalf',
    incorrectAnswers: ['Dumbledore', 'Merlin', 'Saruman']
  },
  {
    category: 'Entertainment',
    difficulty: 'medium',
    question: 'Who directed the movie "Titanic"?',
    correctAnswer: 'James Cameron',
    incorrectAnswers: ['Steven Spielberg', 'George Lucas', 'Christopher Nolan']
  },
  {
    category: 'Entertainment',
    difficulty: 'medium',
    question: 'Which actor played Jack Sparrow in Pirates of the Caribbean?',
    correctAnswer: 'Johnny Depp',
    incorrectAnswers: ['Orlando Bloom', 'Brad Pitt', 'Leonardo DiCaprio']
  },
  {
    category: 'Entertainment',
    difficulty: 'medium',
    question: 'What is the name of the coffee shop in Friends?',
    correctAnswer: 'Central Perk',
    incorrectAnswers: ['Coffee Bean', 'Starbucks', 'Central Park Coffee']
  },
  {
    category: 'Entertainment',
    difficulty: 'hard',
    question: 'Who won the Best Actor Oscar in 2020?',
    correctAnswer: 'Joaquin Phoenix',
    incorrectAnswers: ['Leonardo DiCaprio', 'Adam Driver', 'Jonathan Pryce']
  },
  {
    category: 'Entertainment',
    difficulty: 'hard',
    question: 'Which movie won the first Best Picture Oscar?',
    correctAnswer: 'Wings',
    incorrectAnswers: ['The Jazz Singer', 'Sunrise', 'Metropolis']
  },
  {
    category: 'Entertainment',
    difficulty: 'hard',
    question: 'Who composed the music for Star Wars?',
    correctAnswer: 'John Williams',
    incorrectAnswers: ['Hans Zimmer', 'James Horner', 'Howard Shore']
  },
  {
    category: 'Entertainment',
    difficulty: 'hard',
    question: 'Which actor has won the most Academy Awards?',
    correctAnswer: 'Katharine Hepburn',
    incorrectAnswers: ['Meryl Streep', 'Jack Nicholson', 'Daniel Day-Lewis']
  },

  // Sports - 10 Questions
  {
    category: 'Sports',
    difficulty: 'easy',
    question: 'How many players are on a soccer team?',
    correctAnswer: '11',
    incorrectAnswers: ['9', '10', '12']
  },
  {
    category: 'Sports',
    difficulty: 'easy',
    question: 'Which country won the 2018 FIFA World Cup?',
    correctAnswer: 'France',
    incorrectAnswers: ['Germany', 'Brazil', 'Argentina']
  },
  {
    category: 'Sports',
    difficulty: 'easy',
    question: 'In which sport would you perform a slam dunk?',
    correctAnswer: 'Basketball',
    incorrectAnswers: ['Volleyball', 'Tennis', 'Soccer']
  },
  {
    category: 'Sports',
    difficulty: 'medium',
    question: 'Who has won the most Grand Slam titles in tennis?',
    correctAnswer: 'Novak Djokovic',
    incorrectAnswers: ['Roger Federer', 'Rafael Nadal', 'Pete Sampras']
  },
  {
    category: 'Sports',
    difficulty: 'medium',
    question: 'How many rings are on the Olympic flag?',
    correctAnswer: '5',
    incorrectAnswers: ['4', '6', '7']
  },
  {
    category: 'Sports',
    difficulty: 'medium',
    question: 'Which boxer was known as "The Greatest"?',
    correctAnswer: 'Muhammad Ali',
    incorrectAnswers: ['Mike Tyson', 'Floyd Mayweather', 'Sugar Ray Leonard']
  },
  {
    category: 'Sports',
    difficulty: 'hard',
    question: 'Who is the all-time leading scorer in NBA history?',
    correctAnswer: 'LeBron James',
    incorrectAnswers: ['Kareem Abdul-Jabbar', 'Kobe Bryant', 'Michael Jordan']
  },
  {
    category: 'Sports',
    difficulty: 'hard',
    question: 'Which country has won the most FIFA World Cups?',
    correctAnswer: 'Brazil',
    incorrectAnswers: ['Germany', 'Italy', 'Argentina']
  },
  {
    category: 'Sports',
    difficulty: 'hard',
    question: 'In what year were the first modern Olympic Games held?',
    correctAnswer: '1896',
    incorrectAnswers: ['1900', '1888', '1912']
  },
  {
    category: 'Sports',
    difficulty: 'hard',
    question: 'Which athlete has won the most Olympic gold medals?',
    correctAnswer: 'Michael Phelps',
    incorrectAnswers: ['Usain Bolt', 'Carl Lewis', 'Larisa Latynina']
  },

  // Art - 10 Questions
  {
    category: 'Art',
    difficulty: 'easy',
    question: 'Who painted the Starry Night?',
    correctAnswer: 'Vincent van Gogh',
    incorrectAnswers: ['Pablo Picasso', 'Claude Monet', 'Salvador Dalí']
  },
  {
    category: 'Art',
    difficulty: 'easy',
    question: 'What is the primary color of the sky?',
    correctAnswer: 'Blue',
    incorrectAnswers: ['Red', 'Green', 'Yellow']
  },
  {
    category: 'Art',
    difficulty: 'easy',
    question: 'Which art style features distorted perspectives?',
    correctAnswer: 'Cubism',
    incorrectAnswers: ['Impressionism', 'Realism', 'Surrealism']
  },
  {
    category: 'Art',
    difficulty: 'medium',
    question: 'Who sculpted David?',
    correctAnswer: 'Michelangelo',
    incorrectAnswers: ['Leonardo da Vinci', 'Donatello', 'Raphael']
  },
  {
    category: 'Art',
    difficulty: 'medium',
    question: 'Which museum is home to the Mona Lisa?',
    correctAnswer: 'Louvre',
    incorrectAnswers: ['Metropolitan Museum', 'British Museum', 'Uffizi Gallery']
  },
  {
    category: 'Art',
    difficulty: 'medium',
    question: 'What art movement was Salvador Dalí associated with?',
    correctAnswer: 'Surrealism',
    incorrectAnswers: ['Cubism', 'Impressionism', 'Expressionism']
  },
  {
    category: 'Art',
    difficulty: 'hard',
    question: 'Who painted "The Persistence of Memory"?',
    correctAnswer: 'Salvador Dalí',
    incorrectAnswers: ['Pablo Picasso', 'Vincent van Gogh', 'Claude Monet']
  },
  {
    category: 'Art',
    difficulty: 'hard',
    question: 'Which artist cut off his own ear?',
    correctAnswer: 'Vincent van Gogh',
    incorrectAnswers: ['Pablo Picasso', 'Edvard Munch', 'Paul Gauguin']
  },
  {
    category: 'Art',
    difficulty: 'hard',
    question: 'What is the name of the famous painting by Edvard Munch?',
    correctAnswer: 'The Scream',
    incorrectAnswers: ['The Kiss', 'The Thinker', 'The Night Watch']
  },
  {
    category: 'Art',
    difficulty: 'hard',
    question: 'Which art movement was led by Andy Warhol?',
    correctAnswer: 'Pop Art',
    incorrectAnswers: ['Abstract Expressionism', 'Minimalism', 'Conceptual Art']
  },

  // Technology - 10 Questions
  {
    category: 'Technology',
    difficulty: 'easy',
    question: 'What does CPU stand for?',
    correctAnswer: 'Central Processing Unit',
    incorrectAnswers: ['Computer Personal Unit', 'Central Processor Unit', 'Central Program Unit']
  },
  {
    category: 'Technology',
    difficulty: 'easy',
    question: 'Which company created the iPhone?',
    correctAnswer: 'Apple',
    incorrectAnswers: ['Samsung', 'Google', 'Microsoft']
  },
  {
    category: 'Technology',
    difficulty: 'easy',
    question: 'What does HTML stand for?',
    correctAnswer: 'HyperText Markup Language',
    incorrectAnswers: ['HyperText Markdown Language', 'HighText Machine Language', 'HyperTransfer Markup Language']
  },
  {
    category: 'Technology',
    difficulty: 'medium',
    question: 'Who is the founder of Microsoft?',
    correctAnswer: 'Bill Gates',
    incorrectAnswers: ['Steve Jobs', 'Mark Zuckerberg', 'Jeff Bezos']
  },
  {
    category: 'Technology',
    difficulty: 'medium',
    question: 'What year was Google founded?',
    correctAnswer: '1998',
    incorrectAnswers: ['1995', '2000', '2001']
  },
  {
    category: 'Technology',
    difficulty: 'medium',
    question: 'What does URL stand for?',
    correctAnswer: 'Uniform Resource Locator',
    incorrectAnswers: ['Universal Resource Link', 'Uniform Reference Locator', 'Universal Reference Link']
  },
  {
    category: 'Technology',
    difficulty: 'hard',
    question: 'What was the first programmable computer?',
    correctAnswer: 'Z3',
    incorrectAnswers: ['ENIAC', 'Colossus', 'Harvard Mark I']
  },
  {
    category: 'Technology',
    difficulty: 'hard',
    question: 'Who is known as the father of computer science?',
    correctAnswer: 'Alan Turing',
    incorrectAnswers: ['Charles Babbage', 'John von Neumann', 'Tim Berners-Lee']
  },
  {
    category: 'Technology',
    difficulty: 'hard',
    question: 'What does API stand for?',
    correctAnswer: 'Application Programming Interface',
    incorrectAnswers: ['Application Program Interface', 'Advanced Programming Interface', 'Application Process Interface']
  },
  {
    category: 'Technology',
    difficulty: 'hard',
    question: 'Which programming language was created by Guido van Rossum?',
    correctAnswer: 'Python',
    incorrectAnswers: ['Java', 'JavaScript', 'Ruby']
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('Connected to MongoDB');
    
    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');
    
    // Insert sample questions
    await Question.insertMany(sampleQuestions);
    console.log('Sample questions inserted');
    
    // Count questions by category
    const counts = await Question.aggregate([
      {
        $group: {
          _id: { category: "$category", difficulty: "$difficulty" },
          count: { $sum: 1 }
        }
      }
    ]);
    
    console.log('\nQuestion counts by category and difficulty:');
    console.table(counts);
    
    console.log('\nDatabase seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();