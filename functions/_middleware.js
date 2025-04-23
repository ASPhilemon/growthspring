
export async function onRequest(context) {
  const { request, next } = context;
  if (isLoggedIn(request)) return Response.redirect("https://dash.growthspringers.com"); else return next()
}

function parseJWTCookie(cookieHeader){
  const cookies = new Map(
    cookieHeader?.split(';').map(c => c.trim().split('=')) || []
  );
  return cookies.get('jwt');
}

function isLoggedIn(request){
  const cookieHeader = request.headers.get('Cookie');
  const JWTCookie = parseJWTCookie(cookieHeader)
}