import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { useTranslations } from "next-intl"

const FAQAcordion = () => {
    const t = useTranslations("Contacts_FAQ")
  return (
    <Accordion type="single" collapsible className="bg-light-white px-[2.5rem] py-[1.5rem] border border-gray/25 rounded-[1rem] shadow-custom">
        <AccordionItem value="item-1">
            <AccordionTrigger><div className="flex gap-[1rem] items-center hover:translate-x-[1rem] transition-transform duration-300 h-full py-4 pr-[3rem]"><div className="min-w-[1.5rem] min-h-[1.5rem] rounded-full bg-red grid place-content-center"><p className="text-light-white text-[1rem] font-open-sans font-bold">1</p></div>  { t('question1') }</div></AccordionTrigger>
            <AccordionContent>
                {t('answer1')}
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
            <AccordionTrigger><div className="flex gap-[1rem] items-center hover:translate-x-[1rem] transition-transform duration-300 h-full py-4 pr-[3rem]"><div className="min-w-[1.5rem] min-h-[1.5rem] rounded-full bg-red grid place-content-center"><p className="text-light-white text-[1rem] font-open-sans font-bold">2</p></div>{ t('question2') }</div></AccordionTrigger>
            <AccordionContent>
                {t('answer2')}
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
            <AccordionTrigger><div className="flex gap-[1rem] items-center hover:translate-x-[1rem] transition-transform duration-300 h-full py-4 pr-[3rem]"><div className="min-w-[1.5rem] min-h-[1.5rem] rounded-full bg-red grid place-content-center"><p className="text-light-white text-[1rem] font-open-sans font-bold">3</p></div>{ t('question3') }</div></AccordionTrigger>
            <AccordionContent>
                {t('answer3')}
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
            <AccordionTrigger><div className="flex gap-[1rem] items-center hover:translate-x-[1rem] transition-transform duration-300 h-full py-4 pr-[3rem]"><div className="min-w-[1.5rem] min-h-[1.5rem] rounded-full bg-red grid place-content-center"><p className="text-light-white text-[1rem] font-open-sans font-bold">4</p></div>{ t('question4') }</div></AccordionTrigger>
            <AccordionContent>
                {t('answer4')}
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
            <AccordionTrigger><div className="flex gap-[1rem] items-center hover:translate-x-[1rem] transition-transform duration-300 h-full py-4 pr-[3rem]"><div className="min-w-[1.5rem] min-h-[1.5rem] rounded-full bg-red grid place-content-center"><p className="text-light-white text-[1rem] font-open-sans font-bold">5</p></div>{ t('question5') }</div></AccordionTrigger>
            <AccordionContent>
                {t('answer5')}
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
            <AccordionTrigger><div className="flex gap-[1rem] items-center hover:translate-x-[1rem] transition-transform duration-300 h-full py-4 pr-[3rem]"><div className="min-w-[1.5rem] min-h-[1.5rem] rounded-full bg-red grid place-content-center"><p className="text-light-white text-[1rem] font-open-sans font-bold">6</p></div>{ t('question6') }</div></AccordionTrigger>
            <AccordionContent>
                {t('answer6')}
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7" className="border-none">
            <AccordionTrigger><div className="flex gap-[1rem] items-center hover:translate-x-[1rem] transition-transform duration-300 h-full py-4 pr-[3rem]"><div className="min-w-[1.5rem] min-h-[1.5rem] rounded-full bg-red grid place-content-center"><p className="text-light-white text-[1rem] font-open-sans font-bold">7</p></div>{ t('question7') }</div></AccordionTrigger>
            <AccordionContent>
                {t('answer7')}
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  )
}

export default FAQAcordion