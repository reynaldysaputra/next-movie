import { NextResponse } from "next/server";

export default function middleware(req) {
  const {tokenMovies} = req.cookies;
  const url = req.url;

  if(tokenMovies && url === '/login'){
    return NextResponse.redirect('/payed-articles');
  }else if(!tokenMovies && url === '/payed-articles'){
    return NextResponse.redirect('/login');
  }

}