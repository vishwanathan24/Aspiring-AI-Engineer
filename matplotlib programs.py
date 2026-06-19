#Student Marks – Bar Chart
#---------------------------------------------------------------

import pandas as pd
import matplotlib.pyplot as plt

students = pd.DataFrame({
    "name": ["vishnu", "ajay", "vijay", "bala", "vicky"],
    "marks": [88, 76, 91, 65, 84],
    "subject": ["Math", "Science", "Math", "English", "Science"],
    "passed": [True, False, True, False, True]
})

avg_marks = students.groupby("subject")["marks"].mean()

avg_marks.plot(kind="bar")

plt.title("Average Marks by Subject")
plt.xlabel("Subject")
plt.ylabel("Average Marks")
plt.show()

#Monthly Sales – Line Plot
#------------------------------------------------------------------

import pandas as pd
import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr"]
sales = [1000, 1500, 1200, 1800]

plt.plot(months, sales)

plt.title("Monthly Sales")
plt.xlabel("Month")
plt.ylabel("Sales")
plt.show()


#Height vs Weight – Scatter Plot
#-----------------------------------------------------------------------

import pandas as pd
import matplotlib.pyplot as plt

height = [150, 160, 170, 180]
weight = [50, 60, 70, 80]

plt.scatter(height, weight)

plt.title("Height vs Weight")
plt.xlabel("Height")
plt.ylabel("Weight")
plt.show()


#Mobile Brand Market Share – Pie Chart
#---------------------------------------------------------------------------

import pandas as pd
import matplotlib.pyplot as plt

brands = ["Samsung", "Apple", "Xiaomi", "OnePlus"]
share = [35, 30, 20, 15]

plt.pie(share, labels=brands)

plt.title("Mobile Brand Share")

plt.show()


#library books by category - brah
#-------------------------------------------------------------------------

import pandas as pd
import matplotlib.pyplot as plt

categories = ["Science", "Math", "History", "English"]
books = [120, 80, 60, 100]

plt.barh(categories, books)

plt.title("Library Books by Category")
plt.xlabel("Number of Books")
plt.ylabel("Category")

plt.show()
