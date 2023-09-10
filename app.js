// Import Mongoose and dotenv
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to the database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Person = require('./person'); // Import the Person model

// Create a new person
const newPerson = new Person({
  name: 'abbes',
  age: 31,
  favoriteFoods: ['Pizza', 'Burger'],
});

// Save the new person to the database
newPerson.save()
  .then((data) => {
    console.log('Saved:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  
  
  // Create many records using model.create() 
  const arrayOfPeople = [
    { name: 'Alice', age: 25, favoriteFoods: ['Sushi', 'Pasta'] },
    { name: 'Bob', age: 35, favoriteFoods: ['Tacos', 'Steak'] },
    { name: 'Charlie', age: 28, favoriteFoods: ['Burger', 'Pizza'] },
  ];
  
  Person.create(arrayOfPeople)
    .then((people) => {
      console.log('Created:', people);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    // Trouver toutes les personnes ayant un nom donné
const targetName = 'abbes';
Person.find({ name: targetName })
  .then((people) => {
    console.log('People with the name', targetName, ':', people);
  })
  .catch((error) => {
    console.error('Error:', error);
  });


  // Trouver une seule personne ayant un aliment préféré donné
const targetFood = 'Pizza';
Person.findOne({ favoriteFoods: targetFood })
  .then((person) => {
    console.log('Person with the favorite food', targetFood, ':', person);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  // Trouver une personne par son _id
const personId = '64fdd5cb13a0452784dc7b89'; 
Person.findById(personId)
  .then((person) => {
    console.log('Person with ID', personId, ':', person);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  // Trouver une personne par _id et ajouter "hamburger" à sa liste d'aliments préférés
const personToUpdateId = '64fdd5cb13a0452784dc7b87'; 
Person.findById(personToUpdateId)
  .then((personToUpdate) => {
    if (!personToUpdate) {
      console.log('Person not found.');
      return;
    }

    personToUpdate.favoriteFoods.push('Hamburger');
    return personToUpdate.save();
  })
  .then((updatedPerson) => {
    console.log('Updated Person:', updatedPerson);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  // Trouver une personne par nom et définir son âge à 20
const personNameToUpdate = 'Alice';
Person.findOneAndUpdate(
  { name: personNameToUpdate },
  { age: 20 },
  { new: true } // Renvoyer le document mis à jour
)
  .then((updatedPerson) => {
    console.log('Updated Person:', updatedPerson);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Supprimer une personne par son _id
const personIdToDelete = '64fdd5cb13a0452784dc7b8a'; 
Person.findByIdAndRemove(personIdToDelete)
  .then((removedPerson) => {
    console.log('Removed Person:', removedPerson);
  })
  .catch((error) => {
    console.error('Error:', error);
  });


// Supprimer toutes les personnes dont le nom est "Alice"
const targetNom = 'Alice';
Person.deleteMany({ name: targetNom })
  .then((result) => {
    console.log('Deleted Alice:', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  // Trouver des personnes qui aiment les burritos, les trier par nom, limiter les résultats à deux documents et masquer leur âge
Person.find({ favoriteFoods: 'Burritos' })
.sort({ name: 1 }) // Tri par nom par ordre croissant
.limit(2) // Limiter les résultats à deux documents
.select({ age: 0 }) // Masquer l'âge
.exec()
.then((data) => {
  console.log('Filtered Results:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
