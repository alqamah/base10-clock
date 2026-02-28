# base10-clock

the logically correct clock 
where 1h = 100min and 1min = 100sec

## Relationship between Standard Time and Decimal Time
12h x 60m x 60s = 10dh x 100dm x 100ds

## Live Link
https://alqamah.github.io/base10-clock/base10-clock_fe/index.html 


## Formula
The day is a constant duration of $86,400,000$ milliseconds. To find the decimal equivalent, we use the following variables:$T_{ms}$: Total standard milliseconds elapsed since midnight.$D_{base}$: The total units in your decimal day (for a true 10h decimal day, this is $100,000,000$ decimal milliseconds).Step 1: Calculate Standard Progress ($P$)First, find the total milliseconds passed in the current standard day ($24\text{h}$):$$T_{ms} = (\text{hours} \times 3,600,000) + (\text{minutes} \times 60,000) + (\text{seconds} \times 1,000) + \text{milliseconds}$$Then, normalize this value to a factor between $0$ and $1$:$$P = \frac{T_{ms}}{86,400,000}$$Step 2: Scale to Decimal Total ($T_{dec}$)Multiply the progress factor by the total capacity of the decimal day:$$T_{dec} = P \times 100,000,000$$Step 3: Component Extraction (The Modulo Method)To display the time in H:M:S format, you must extract the units from $T_{dec}$ using nested division and the modulo operator ($\%$) to prevent "overflow" (where minutes exceed 99).Decimal Hours ($H_{dec}$): $$\lfloor T_{dec} / 10,000,000 \rfloor$$Decimal Minutes ($M_{dec}$): $$\lfloor (T_{dec} \pmod{10,000,000}) / 100,000 \rfloor$$Decimal Seconds ($S_{dec}$): $$\lfloor (T_{dec} \pmod{100,000}) / 1,000 \rfloor$$