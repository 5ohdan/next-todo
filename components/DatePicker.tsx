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
  const [draftDate, setDraftDate] = useState<Date | undefined>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-between text-left font-normal",
            !draftDate && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {draftDate ? format(draftDate, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          //can't create todo with date before today
          fromDate={new Date()}
          selected={draftDate}
          onSelect={(day) => {
            if (day) {
              setDraftDate(day)
              setDate(day)
              return
            }
            setDraftDate(undefined)
            setDate(null)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export const DatePickerMemoized = memo(DatePicker)
