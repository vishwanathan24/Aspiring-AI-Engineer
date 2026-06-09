def rat_num_row():
    f = open('VISHNU.txt', 'w+')
    f.write("\nlift Angle Triange Number Row\n-------------------------------------------------\n")
    for i in range(1,6):
        for j in range(0,i):
            f.write(str(i))
        f.write("\n")
    f.close()

rat_num_row()



def rat_num_col():
    f = open('VISHNU.txt', 'a+')
    f.write("\nlift Angle Triangle Number Row\n------------------------------------------------\n")
    for i in range(1,6):
        for j in range(i):
            f.write(str(j))
        f.write("\n")
    f.close()

rat_num_col()


def ratupper():
    f = open('VISHNU.txt', 'a+')
    f.write("\nlift Angle Triangle upper Row\n--------------------------------------------------\n")
    for i in range(1,6):
        for j in range(6,i):
            f.write(str(i))
        for k in range(0,i):
            f.write(chr(i+96))
        f.write("\n")
    f.close()

ratupper()



def ratlower():
    f = open('VISHNU.txt', 'a+')
    f.write("\nlift Angle Triangle upper column\n-----------------------------------------------\n")
    for i in range(1,6):
        for j in range(6,i):
            f.write(str(i))
        for k in range(0,i):
            f.write(chr(k+65))
        f.write("\n")
    f.close()

ratlower()



def rat_star():
    f = open('VISHNU.txt', 'a+')
    f.write("\nlift Angle Triangle star\n---------------------------------- ---------------\n")
    for i in range(1,7):
        for j in range(i):
            f.write(str("*"))
        f.write("\n")
    f.close()

rat_star()



def ratupper():
    f = open('VISHNU.txt', 'a+')
    f.write("\nlift Angle Triangle upper Row\n------------------------------------------\n")
    for i in range(1,8):
        for j in range(8,i):
            f.write(str(i))
        for k in range(0,i):
            f.write(chr(k+64))
        f.write("\n")
    f.close()

ratupper()




def ratlower():
    f = open('VISHNU.txt', 'a+')
    f.write("\nlift Angle Triangle lower column\n-----------------------------------------\n")
    for i in range(1,7):
        for j in range(7,i):
            f.write(str(i))
        for k in range(0,i):
            f.write(chr(k+97))
        f.write("\n")
    f.close()

ratlower()



def ratname_row():
    name = "vishwanathan"
    f = open("VISHNU.txt","a+")
    f.write("lift Angle Triangle name lower row\n--------------------------------------------\n")
    for i in range(len(name)):
        for j in range(i+1):
            f.write(name[i])
        f.write("\n")
    f.close()

ratname_row()



def ratname_col():
    name = "vishwanathan"
    f = open("VISHNU.txt","a+")
    f.write("lift Angle Triangle name lower column\n--------------------------------------------\n")
    for i in range(len(name)):
        for j in range(i+1):
            f.write(name[j])
        f.write("\n")
    f.close()

ratname_col()



def ratname_row():
    name = "vishwanathan".upper()
    f = open("VISHNU.txt","a+")
    f.write("lift Angle Triangle name upper row\n--------------------------------------\n")
    for i in range(len(name)):
        for j in range(0,i+1):
            f.write(name[i])
        f.write("\n")
    f.close()

ratname_col()



def ratname_col():
    name = "vishwanathan".upper()
    f = open("VISHNU.txt","a+")
    f.write("lift Angle Triangle name lower column\n--------------------------------------\n")
    for i in range(len(name)):
        for j in range(0,i+1):
            f.write(name[j])
        f.write("\n")
    f.close()

ratname_col()



def rat_num_inrow():
    f = open("VISHNU.txt","a+")
    f.write("lift Angle Triangle Number inverse row\n----------------------------------------\n")
    for i in range(7,-1,-1):
        for j in range(0,i):
            f.write(str(i))
        f.write("\n")
    f.close()

rat_num_inrow()



def rat_num_incol():
    f = open("VISHNU.txt","a+")
    f.write("lift Angle Triangle Number inverse col\n----------------------------------------\n")
    for i in range(7,-1,-1):
        for j in range(i):
            f.write(str(j))
        f.write("\n")
    f.close()

rat_num_incol()



def rat_star_inverse():
    f = open("VISHNU.txt","a+")
    f.write("lift Angle Triangle star inverse \n----------------------------------------\n")
    for i in range(8,-1,-1):
        for j in range(i):
            f.write(str("*"))
        f.write("\n")
    f.close()

rat_star_inverse()



def rat_upper_ir():
    f = open('VISHNU.txt', 'a+')
    f.write("\nlift Angle Triangle upper inverse Row\n-------------------------------------\n")
    for i in range(6,-1,-1):
        for j in range(6,i):
            f.write(str(i))
        for k in range(0,i):
            f.write(chr(i+64))
        f.write("\n")
    f.close()

rat_upper_ir()



def rat_upper_ic():
    f = open('VISHNU.txt', 'a+')
    f.write("\nlift Angle Triangle upper inverse column\n-------------------------------------\n")
    for i in range(6,-1,-1):
        for j in range(6,i):
            f.write(str(i))
        for k in range(0,i):
            f.write(chr(k+65))
        f.write("\n")
    f.close()

rat_upper_ic()



def rat_lower_ir():
    f = open('VISHNU.txt', 'a+')
    f.write("\nlift Angle Triangle lower inverse Row\n-------------------------------------\n")
    for i in range(8,-1,-1):
        for j in range(8,i):
            f.write(str(i))
        for k in range(0,i):
            f.write(chr(i+96))
        f.write("\n")
    f.close()

rat_lower_ir()



def rat_name_linr():
    name = "vishnu"
    f = open("VISHNU.txt","a+")
    f.write("lift Angle Triangle name lower inverse row\n--------------------------------------\n")
    for i in range(5,-1,-1):
        for j in range(6,i,-1):
            f.write(name[i])
        f.write("\n")
    f.close()

rat_name_linr()



def rat_name_linc():
    name = "vishnu"
    f = open("VISHNU.txt","a+")
    f.write("lift Angle Triangle name lower inverse column\n--------------------------------------\n")
    for i in range(6,-1,-1):
        for j in range(5,i,-1):
            f.write(name[j])
        f.write("\n")
    f.close()

rat_name_linc()



def rat_name_uinr():
    name = "vishnu".upper()
    f = open("VISHNU.txt","a+")
    f.write("lift Angle Triangle name upper inverse row\n--------------------------------------\n")
    for i in range(5,-1,-1):
        for j in range(6,i,-1):
            f.write(name[i])
        f.write("\n")
    f.close()

rat_name_uinr()


def rat_name_uinc():
    name = "vishnu".upper()
    f = open("VISHNU.txt","a+")
    f.write("lift Angle Triangle name upper inverse column\n--------------------------------------\n")
    for i in range(6,-1,-1):
        for j in range(5,i,-1):
            f.write(name[j])
        f.write("\n")
    f.close()

rat_name_uinc()






































