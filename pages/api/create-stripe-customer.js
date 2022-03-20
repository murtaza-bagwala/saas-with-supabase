import initStripe from "stripe"
import { supabase } from "../../utils/supabase";

const handler = async (req, res) => {
    const stripe = initStripe(process.env.STRIPE_SECRET);
    const customer = await stripe.customers.create({
        email: req.body.record.email
    })

    await supabase.from("profile").update({
        stripe_customer: customer.id
    }).eq("id", req.body.record.id)

    return res.send({message: `customer created ${customer.id}`});

}

export default handler;