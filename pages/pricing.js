import { supabase } from "../utils/supabase"
import { useEffect } from "react"
import Router from "next/router";
import { useUser } from "../context/user"
import initStripe from "stripe"

export default function pricing ({plans}) {

    const {user, login} = useUser();

    const showSubscribeButton = !!user && !user.is_subscribed
    const showCreateAccountButton = !user
    const showManageSubscriptionButton = user && user.is_subscribed
    
    
    return (
        <div className="w-full max-w-3xl mx-auto py-16 flex justiy-around">
            {plans.map(plan =>(
              <div key={plan.id} className="w-80 h-40 rounded shadow px-6 py-6">
                  <h2 className="text-xl">{plan.name}</h2>
                  <p className="text-gray-500">
                    {plan.price / 100} / {plan.interval}
                  </p>
                  { showSubscribeButton && <button>Subscribe</button>}
                  { showCreateAccountButton && <button onClick={login}>Create Account</button>}
                  { showManageSubscriptionButton && <button>Manage Subscription</button>}
              </div>
            ))}
        </div>
    )
  
}

export const getStaticProps = async () => {
  const stripe = initStripe(process.env.STRIPE_SECRET)
  const {data: prices} = await stripe.prices.list();
  const plans = await Promise.all(prices.map(async (price) => {
      const product = await stripe.products.retrieve(price.product)
      return {
          id: price.id,
          name: product.name,
          price: price.unit_amount,
          interval: price.recurring.interval,
          currency: price.currency,
      }
  }))

  return {
    props: {
      plans
    }
  }
}