use crate::schema::sales;
use serde::{Serialize, Deserialize};


#[derive(Queryable, Serialize, Debug)]
pub struct Sale { 
    pub id: i32,
    pub product_id: i32,
    pub sold_on: i32,
}

#[derive(Insertable, Serialize, Debug)]
#[table_name = "sales"]
pub struct NewSale { 
    pub product_id: i32,
    pub sold_on: i32,
}




