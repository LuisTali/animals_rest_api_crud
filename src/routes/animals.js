import {Router} from 'express';
const router = Router();

import {getAnimales,createNewAnimal,getAnimalById, deleteAnimalById, updateAnimalById} from '../controllers/animals'

router.get('/',getAnimales);

router.post('/',createNewAnimal);

router.get('/:id',getAnimalById);

router.delete('/:id',deleteAnimalById);

router.put('/:id',updateAnimalById);

export default router