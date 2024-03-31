
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties() {

  try {

    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties`, {cache: 'no-store'});

    if (!res.ok) {
      throw new Error('failed to fetch data');
    }

    return res.json();

  } catch (e) {

    console.log('ERROR:',e);
  }
  return [];
}

async function fetchProperty(id) {

  try {

    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error('failed to fetch data');
    }

    return res.json();

  } catch (e) {

    console.log('ERROR:',e);
  }
  return null;
}


export { fetchProperties,fetchProperty }