#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use diesel_migrations::{embed_migrations, EmbedMigrations};


use reqwest::Url;
use tauri::App;
// use schema::todos;
use std::error::Error;
use std::{error, string, sync::Mutex};

// Start of DB example
// use super::db::{};
#[macro_use]
extern crate diesel;
#[macro_use] 
extern crate diesel_migrations;
embed_migrations!("./migrations/");

use diesel::prelude::*;
pub mod schema;
pub mod db;


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}


#[tauri::command]
fn do_sale(product_id: i32,state: tauri::State<AppState>) {
    let conn = state.conn.lock().unwrap();
    db::sales_create(&conn, product_id);
}

#[tauri::command]
fn get_sales(state: tauri::State<AppState>) -> String{
    let con = state.conn.lock().unwrap();
    db::sales_list(&con)
}


struct AppState {
    conn: Mutex<SqliteConnection>,
}

fn main() {

    let conn = db::establish_connection();

    let state = AppState {
        conn: Mutex::new(db::establish_connection()),
    };

    diesel_migrations::run_pending_migrations(&conn).expect("Error migrating");


    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![greet,do_sale,get_sales])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
