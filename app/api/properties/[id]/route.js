
import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties
export const GET = async(request, { params }) => {

  try {

    const connected = await connectDB();

    if (!connected) {
      return new Response(JSON.stringify({error: {message: 'database connection error'}}), { status: 500 });
    }

    const property = await Property.findById(params.id);
    if (!property) {
      console.log(`ERROR: property id ${params.id} not found`);
      return new Response(JSON.stringify({error: {message: 'property not found'}}), { status: 404 });
    }

    return new Response(
      JSON.stringify(property), 
        {status: 200}
      );

  } catch(e) {

    console.log('ERROR:', e);
    return new Response(JSON.stringify({error: {message: `database fetch error`}}), { status: 500 });

  }
}