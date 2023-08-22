"use client"

import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { Button } from "./ui/button"
import { memo, useState } from "react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

const DatePicker = ({
  placeholder,
  setDate,
}: {
  placeholder: string
  setDate: (day: Date | null) => void
}) => {
  // naming just to avoid same name from props
  const [drafrtDate, setDraftDate] = useState<Date | undefined>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-between text-left font-normal",
            !drafrtDate && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {drafrtDate ? format(drafrtDate, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          fromDate={new Date()}
          selected={drafrtDate}
          onSelect={(day) => {
            if (typeof day === "object") {
              setDraftDate(day)
              setDate(day)
            } else if (typeof day === "undefined") {
              setDraftDate(day)
              setDate(null)
            }
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export const DatePickerMemoized = memo(DatePicker)
