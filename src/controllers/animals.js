import {getConnection,sql} from '../database/connection'

export const getAnimales = async (req,res)=>{  

    const pool = await getConnection();

    try {

        let result = await pool.request().query('SELECT * FROM animals');  

        console.log(result);

        return res.status(200).json({succes:true,data:result.recordsets[0]})

    } catch (error) {
        console.log(error);
    }
    
};

export const createNewAnimal = async(req,res) =>{
    
    const {name,idType} = req.body;
    
    //Para que si no setea una edad el usuario, por default le asigno 1
    let {age} = req.body;
    
    if(name == null || idType == null){
        return res.status(400).json({success:false,msg:'Complete los datos Name y idType'});
    }

    if(age==null) age = 1;
    
    const pool = await getConnection();
    
    try {
        await pool.request().input("name",sql.VarChar,name).input("idType",sql.Int,idType).input("age",sql.Int,age).query('INSERT INTO animals VALUES (@name,@idType,@age)');
        
        return res.json({success:true,msg:`New animal created ${name}, Age ${age}, idType ${idType}`});

    } catch (error) {
        console.log(error);
    }

    
}

export const updateAnimalName = async(req,res)=>{
    
    const {id} = req.params.id;
    
    let animalFind = pool.request().query(`SELECT name FROM animals WHERE idAnimal = ${id}`);
    
    if(!animalFind){
        return res.status(400).json({success:false,msg:'There is not an animal with that id'})
    }
    
} 


//export default getAnimales;