export const querys = {
    getAllAnimalsOrderedByType: 'SELECT idAnimal,aName,a.idType,typeName FROM animals AS a INNER JOIN types AS t ON t.idType = a.idType ORDER BY typeName asc, aName asc',
    findById:'SELECT * FROM animals WHERE idAnimal = @id',
    addNewAnimal: 'INSERT INTO animals VALUES (@name,@idType,@age)',
    deleteAnimalById: 'DELETE FROM animals WHERE idAnimal = @id',
    updateAnimalById: 'UPDATE animals SET aName = @newName, age = @newAge WHERE idAnimal = @id',
    countAnimals: 'SELECT count(*) AS cant FROM animals'
}