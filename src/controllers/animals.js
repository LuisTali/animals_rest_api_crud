import {getConnection, sql, querys} from '../database'


export const getAnimales = async (req,res)=>{  

    try {

        const pool = await getConnection();

        let result = await pool.request().query(querys.getAllAnimalsOrderedByType);  

        console.log(result);

        return res.status(200).json({succes:true,data:result.recordsets[0]})

    } catch (error) {
        return res.status(500).json({success:false,data:error.message});
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
        return res.status(500).json({success:false,data:error.message});
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
            return res.status(400).json({success:false,msg:`No animals find with Id ${id}`})
        }

        return res.status(200).json({success:true,animal:animalFind.recordset[0]});
    } catch (error) {
        return res.status(500).json({success:false,data:error.message});
    }
} 

export const deleteAnimalById = async(req,res)=>{
    const {id} = req.params;

    try {
        const pool = await getConnection();
        const result = await pool.request().input("id",sql.Int,id).query(querys.deleteAnimalById);

        if(result.rowsAffected[0] === 0){
            res.status(400).json({success:false,msg: `No animals find with Id ${id}, please provide a real Id`})
        }
        res.status(200).json({success:true,data:result});
    } catch (error) {
        return res.status(500).json({success:false,data:error.message});
    }
}

export const updateAnimalById = async(req,res)=>{
    const {id} = req.params;
    let {newName,newAge} = req.body;

    try {

        if(newName === undefined && newAge === undefined){
            return res.status(400).json({
                success:false,msg:'Si desea actualizar un animal provea su nuevo nombre y / o edad'
            })
        }

        const pool = await getConnection();
        let animalWanted = await pool.request().input("id",sql.Int,id).query(querys.findById);

        if(animalWanted.rowsAffected[0] === 0){
            return res.status(400).json({success:false,msg:`No animals find with Id ${id}`})
        }

        //Obtengo el nombre y edad actual del animal buscado para su posterior uso
        let nameWanted = animalWanted.recordset[0].aName;
        let ageWanted = animalWanted.recordset[0].age;
        
        //Si el cliente desea cambiar la edad solamente o el nombre y no especifica el uno u otro se toma como valor el ya presente en la BD.
        if(newName === undefined){
            newName = nameWanted;
        }
        if(newAge === undefined){
            newAge = ageWanted;
        }

        pool.request().input("id",sql.Int,id).input("newName",sql.VarChar,newName).input("newAge",sql.Int,newAge).query(querys.updateAnimalById);

        return res.status(200).json({success:true,msg:`Animal con Id ${id} conocido como ${nameWanted} cambio a ${newName}, Age: ${newAge}`});

    } catch (error) {
        return res.status(500).json({success:false,data:'Hubo un error desconocido'});
    }
    
}

export const countAnimals = async(req,res)=>{
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.countAnimals);
        console.log(result.recordset[0].cant);
        return res.status(200).json({success:true,data:`Cantidad de animales contados ${result.recordset[0].cant}`})
    } catch (error) {
        return res.status(500).json({success:false,data:error.message});
    }
}


//export default getAnimales;