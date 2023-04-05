export const querys = {
    getAllAnimalsOrderedByType: 'SELECT idAnimal,aName,typeName FROM animals AS a INNER JOIN types AS t ON t.idType = a.idType ORDER BY typeName asc, aName asc',
    findById:'SELECT * FROM animals WHERE idAnimal = @id',
    addNewAnimal: 'INSERT INTO animals VALUES (@name,@idType,@age)'
}