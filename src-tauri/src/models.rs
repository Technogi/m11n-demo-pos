use crate::schema::sales;
use serde::{Serializable, Deserializable};

#[derive( Debug)] // these annotation adds extra functionality to objects of this struct, Debug is for printing in console `dbg!(todo)`
pub struct Sale {
    pub product_id: i32,
    pub sold_on: i32,
}

#[derive(Insertable, Serialize, Debug, Clone)]
#[table_name = "sales"]
pub struct NewSale {  // this struct will be use when inserting into the db, a struct can be Queryable and Insertable at the same time too. 
    pub product_id: i32,
    pub sold_on: i32,
}