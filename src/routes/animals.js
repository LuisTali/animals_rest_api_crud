import {Router} from 'express';
const router = Router();

import {getAnimales,createNewAnimal} from '../controllers/animals'

router.get('/',getAnimales);

router.get('/animalitos',(req,res)=>{
    res.send('Hello animalsitos');
});

router.post('/',createNewAnimal);

router.get('/:id',);

router.delete('/',);

router.put('/:id',);

export default router