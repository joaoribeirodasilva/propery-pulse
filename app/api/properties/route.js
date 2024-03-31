import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudinary';

// GET /api/properties
export const GET = async(request) => {

  try {

    const connected = await connectDB();

    if (!connected) {
      return new Response(JSON.stringify({error: {message: 'database connection error'}}), { status: 500 });
    }

    const properties = await Property.find({})

    return new Response(
      JSON.stringify(properties), 
        {status: 200}
      );

  } catch(e) {

    console.log('ERROR:', e);
    return new Response(JSON.stringify({error: {message: `database fetch error`}}), { status: 500 });

  }
}

export const POST = async(request) => {

  try {

    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response({message: 'access denied'},{status: 403});
    }

    const { userId } = sessionUser

    const formData = await request.formData();

    const amenities = formData.getAll('amenities');
    const images = formData.getAll('images').filter((image) => image.name !== '');

    const propertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId
    };

    const imageUploadPromisses = [];

    for( const image of images) {

      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      const imageBase64 = imageData.toString('base64');

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {folder: 'propertypulse'}
      );

      // console.log(result)

      imageUploadPromisses.push(result.secure_url);

      const uploadedImages = await Promise.all(imageUploadPromisses);

      propertyData.images = uploadedImages;

    }

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);
    // console.log(propertyData)
    
    
    // return new Response(JSON.stringify({message: 'success'}), {status: 200})
  } catch(e) {
    console.log('ERROR:',e)
    return new Response(JSON.stringify({message: 'failed to add property'}), {status: 500})
  }
}