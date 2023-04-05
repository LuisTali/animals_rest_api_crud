import {Router} from 'express';
const router = Router();

import {getAnimales,createNewAnimal,getAnimalById} from '../controllers/animals'

router.get('/',getAnimales);

router.get('/animalitos',(req,res)=>{
    res.send('Hello animalsitos');
});

router.post('/',createNewAnimal);

router.get('/:id',getAnimalById);

router.delete('/',);

router.put('/:id',);

export default router