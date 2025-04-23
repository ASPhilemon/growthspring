
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  const cookieHeader = request.headers.get('Cookie');
  const cookies = new Map(
    cookieHeader?.split(';').map(c => c.trim().split('=')) || []
  );
  const jwtToken = cookies.get('jwt');

  if (jwtToken) return Response.redirect("https://dash.growthspringers.com"); else next()

}