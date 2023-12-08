use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use std::io;
use actix_files::{Files, NamedFile};
use actix_web::middleware::Logger;

async fn fetch_data() -> Result<String, reqwest::Error> {
    let response = reqwest::get("https://dummyjson.com/quotes").await?;
    let data = response.text().await?;
    Ok(data)
}

async fn questions_handler() -> impl Responder {
    match fetch_data().await {
        Ok(data) => HttpResponse::Ok()
            .content_type("application/json")
            .body(data),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

async fn angular_index() -> Result<NamedFile, io::Error> {
    Ok(NamedFile::open("./static/browser/index.html")?)
}

#[actix_web::main]
async fn main() -> io::Result<()> {
    env_logger::init();

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .service(web::resource("/api").route(web::get().to(questions_handler)))
            .service(Files::new("/", "./static/browser").prefer_utf8(true).index_file("index.html"))
            .route("/", web::get().to(angular_index))
    })
    .bind("127.0.0.1:8037")?
    .run()
    .await
}
