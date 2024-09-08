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
    <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
            <AccordionTrigger>{ t('question1') }</AccordionTrigger>
            <AccordionContent>
                {t('answer1')}
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
            <AccordionTrigger>{ t('question2') }</AccordionTrigger>
            <AccordionContent>
                {t('answer2')}
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
            <AccordionTrigger>{ t('question3') }</AccordionTrigger>
            <AccordionContent>
                {t('answer3')}
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
            <AccordionTrigger>{ t('question4') }</AccordionTrigger>
            <AccordionContent>
                {t('answer4')}
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
            <AccordionTrigger>{ t('question5') }</AccordionTrigger>
            <AccordionContent>
                {t('answer5')}
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
            <AccordionTrigger>{ t('question6') }</AccordionTrigger>
            <AccordionContent>
                {t('answer6')}
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
            <AccordionTrigger>{ t('question7') }</AccordionTrigger>
            <AccordionContent>
                {t('answer7')}
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  )
}

export default FAQAcordion