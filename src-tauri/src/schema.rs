// @generated automatically by Diesel CLI.

diesel::table! {
    sales (id) {
        id -> Integer,
        product_id -> Integer,
        sold_on -> Integer,
    }
}
