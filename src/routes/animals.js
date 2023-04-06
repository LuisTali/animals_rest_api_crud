import {Router} from 'express';
const router = Router();

import {getAnimales,createNewAnimal,getAnimalById, deleteAnimalById, updateAnimalById, countAnimals} from '../controllers/animals'

router.get('/',getAnimales);

router.post('/',createNewAnimal);

router.get('/:id',getAnimalById);

router.delete('/:id',deleteAnimalById);

router.put('/:id',updateAnimalById);

router.get('/:id/count',countAnimals)

export default router