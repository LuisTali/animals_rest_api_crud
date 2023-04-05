import {getConnection, sql, querys} from '../database'


export const getAnimales = async (req,res)=>{  

    try {

        const pool = await getConnection();

        let result = await pool.request().query(querys.getAllAnimalsOrderedByType);  

        console.log(result);

        return res.status(200).json({succes:true,data:result.recordsets[0]})

    } catch (error) {
        return res.status(500).send(error.message);
    }
    
};

export const createNewAnimal = async(req,res) =>{
    
    const {name,idType} = req.body;
    
    //Para que si no setea una edad el usuario, pueda setearla por default
    let {age} = req.body;
    
    if(name == null || idType == null){
        return res.status(400).json({success:false,msg:'Complete los datos Name y idType'});
    }

    if(age==null) age = 0;
    
    try {
        const pool = await getConnection();
        
        //Input para cada columna en la tabla Animals
        await pool.request().input("name",sql.VarChar,name).input("idType",sql.Int,idType).input("age",sql.Int,age).query(querys.addNewAnimal);
        
        return res.json({success:true,msg:`New animal created ${name}, Age ${age}, idType ${idType}`});

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const getAnimalById = async(req,res)=>{
    
    const {id} = req.params;
    console.log(id);
    try {
        const pool = await getConnection();

        let animalFind = await pool.request().input("id",sql.Int,id).query(querys.findById);
        
        console.log(animalFind);
        
        if(animalFind.rowsAffected[0] === 0){
            return res.status(400).json({success:false,msg:'There is not an animal with that id'})
        }

        return res.status(200).json({success:true,animal:animalFind.recordset[0]});
    } catch (error) {
        res.status(500).send(error.message);
    }
      
} 


//export default getAnimales;