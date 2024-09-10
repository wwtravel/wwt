"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group w-[25rem]"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group w-[25rem] toast text-[1rem] group-[.toaster]:!bg-light-white group-[.toaster]:text-dark-gray group-[.toaster]:border-gray/25 group-[.toaster]:shadow-custom rounded-[0.5rem]",
          description: "group-[.toast]:text-gray font-open-sans text-[0.75rem]",
          actionButton:
            "group-[.toast]:!bg-red group-[.toast]:!text-light-white group-[.toast]:!text-[0.75rem] p-[1rem] rounded-[0.5rem]",
          cancelButton:
            "group-[.toast]:!bg-dark-gray group-[.toast]:!text-light-white",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
