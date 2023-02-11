extern crate dotenv;

pub mod models;
use crate::schema::*;
use diesel::prelude::*;
use dotenv::dotenv;
use models::{NewSale,Sale};
use std::env;
use chrono::Utc;


pub fn establish_connection() -> SqliteConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn sales_create(conn: &SqliteConnection, product_id: i32){
  let sold_on = Utc::now().timestamp() as i32;

  let new_sale = NewSale { product_id, sold_on };

  diesel::insert_into(sales::table)
    .values(&new_sale)
    .execute(conn)
    .expect("Error saving new sale");
}

pub fn sales_list(conn: &SqliteConnection) -> String {
  let all_sales = sales::dsl::sales
    .load::<Sale>(conn)
    .expect("Expect loading sales");
  
  let serialized = serde_json::to_string(&all_sales).unwrap();
  serialized
}

// pub fn todos_create(conn: &SqliteConnection, title: &str, body: &str) -> String {
//     let new_todo = NewTodo { title, body };
//     let todo = diesel::insert_into(todos::table)
//         .values(&new_todo)
//         .execute(conn)
//         .expect("Error saving new post");
//     let todo_json  =serde_json::to_string(&todo).unwrap();
//     todo_json
// }

// pub fn todos_list(conn: &SqliteConnection) -> String {
//     let all_todos = todos::dsl::todos
//         .load::<Todo>(conn)
//         .expect("Expect loading posts");
//     let serialized = serde_json::to_string(&all_todos).unwrap();
//     serialized
// }
