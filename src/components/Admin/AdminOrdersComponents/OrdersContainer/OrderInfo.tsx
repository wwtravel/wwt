'use client'

import { motion } from "framer-motion"
import { Order } from "../AdminOrdersContent";
import { useTranslations } from "next-intl";

interface OrderInfoProps{
    order : Order;
}

const OrderInfo:React.FC<OrderInfoProps> = ({ order }) => {

    const t = useTranslations("AdminOrders")

  return (
    <motion.div
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        exit={{ height: 0 }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
    >
        <div className="mt-[2rem] pt-[2rem] border-t border-gray/25 flex flex-row items-start justify-between">
            <div className="flex-1 flex flex-col gap-[0.25rem]">
                {
                    order.passengers.map((passenger, index) => (
                        <div className="flex items-center gap-[0.5rem]" key={index}>
                            <p className="font-open-sans text-gray/75 font-[400] text-[1rem]">{ t('pass-order-number') }{ index + 1 }</p>
                            <p className="font-open-sans text-dark-gray font-bold text-[1rem]">{ passenger.lastname } { passenger.firstname }</p>
                        </div>
                    ))
                }
            </div>
            <div className="flex-1">

            </div>
        </div>
    </motion.div>
  )
}

export default OrderInfo