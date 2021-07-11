import numpy as np
import csv
"""
rnd_0=np.random.normal(32.0, 3.0, 6000)
condition_rnd_0 = rnd_0 > 29.0
rnd_0=np.extract(condition_rnd_0, rnd_0)
rnd_1=np.random.normal(32.0, 4.1, 6000)
condition_rnd_1 = rnd_1 > 28.2
rnd_1=np.extract(condition_rnd_1, rnd_1)
rnd_2=np.random.normal(32.0, 3.9, 6000)
condition_rnd_2 = rnd_2 > 27.8
rnd_2=np.extract(condition_rnd_2, rnd_2)
rnd_3=np.random.normal(32.0, 4.3, 6000)
condition_rnd_3 = rnd_3 > 29.0
rnd_3=np.extract(condition_rnd_3, rnd_3)
rnd_4=np.random.normal(32.0, 5.2, 6000)
condition_rnd_4 = rnd_4 > 28.1
rnd_4=np.extract(condition_rnd_4, rnd_4)
rnd_5=np.random.normal(32.0, 5.0, 6000)
condition_rnd_5 = rnd_5 > 28.4
rnd_5=np.extract(condition_rnd_5, rnd_5)

auto_0=np.random.normal(32.0, 3.9, 4000)
condition_auto_0 = auto_0 > 28.5
auto_0=np.extract(condition_auto_0, auto_0)

auto_1=np.random.normal(17.3, 15.0, 4000)
condition_auto_1 = auto_1 > 3.3
auto_1=np.extract(condition_auto_1, auto_1)
condition_auto_1 = auto_1 < 38.3
auto_1=np.extract(condition_auto_1, auto_1)

auto_2=np.random.normal(6.2, 12.0, 4000)
condition_auto_2 = auto_2 > 3.1
auto_2=np.extract(condition_auto_2, auto_2)
condition_auto_2 = auto_2 < 37.1
auto_2=np.extract(condition_auto_2, auto_2)

auto_3=np.random.normal(3.5, 10.0, 4000)
condition_auto_3 = auto_3 > 0.005
auto_3=np.extract(condition_auto_3, auto_3)
condition_auto_3 = auto_3 < 29.0
auto_3=np.extract(condition_auto_3, auto_3)

auto_4=np.random.normal(3.2, 8.0, 4000)
condition_auto_4 = auto_4 > 0.0
auto_4=np.extract(condition_auto_4, auto_4)
condition_auto_4 = auto_4 < 26.0
auto_4=np.extract(condition_auto_4, auto_4)

auto_5=np.random.normal(2.0, 7.0, 4000)
condition_auto_5 = auto_5 > 0.0
auto_5=np.extract(condition_auto_5, auto_5)
condition_auto_5 = auto_5 < 20.0
auto_5=np.extract(condition_auto_5, auto_5)

manual_ref_0=np.random.normal(32.2, 5.0, 4000)
condition_manual_ref_0 = manual_ref_0 > 28.2
manual_ref_0=np.extract(condition_manual_ref_0, manual_ref_0)

manual_ref_1=np.random.normal(14.3, 14.0, 4000)
condition_manual_ref_1 = manual_ref_1 > 2.0
manual_ref_1=np.extract(condition_manual_ref_1, manual_ref_1)
condition_manual_ref_1 = manual_ref_1 < 31.0
manual_ref_1=np.extract(condition_manual_ref_1, manual_ref_1)

manual_ref_2=np.random.normal(7.1, 10.4, 4000)
condition_manual_ref_2 = manual_ref_2 > 0.0
manual_ref_2=np.extract(condition_manual_ref_2, manual_ref_2)
condition_manual_ref_2 = manual_ref_2 < 27.0
manual_ref_2=np.extract(condition_manual_ref_2, manual_ref_2)

manual_ref_3=np.random.normal(4.0, 8.4, 4000)
condition_manual_ref_3 = manual_ref_3 > 0.0
manual_ref_3=np.extract(condition_manual_ref_3, manual_ref_3)
condition_manual_ref_3 = manual_ref_3 < 28.0
manual_ref_3=np.extract(condition_manual_ref_3, manual_ref_3)

manual_ref_4=np.random.normal(3.1, 7.0, 4000)
condition_manual_ref_4 = manual_ref_4 > 0.0
manual_ref_4=np.extract(condition_manual_ref_4, manual_ref_4)
condition_manual_ref_4 = manual_ref_4 < 19.0
manual_ref_4=np.extract(condition_manual_ref_4, manual_ref_4)

manual_ref_5=np.random.normal(2.0, 6.4, 4000)
condition_manual_ref_5 = manual_ref_5 > 0.0
manual_ref_5=np.extract(condition_manual_ref_5, manual_ref_5)
condition_manual_ref_5 = manual_ref_5 < 18.4
manual_ref_5=np.extract(condition_manual_ref_5, manual_ref_5)


manual_ide_0=np.random.normal(32.6, 5.0, 4000)
condition_manual_ide_0 = manual_ide_0 > 29.0
manual_ide_0=np.extract(condition_manual_ide_0, manual_ide_0)

manual_ide_1=np.random.normal(21.3, 19.0, 4000)
condition_manual_ide_1 = manual_ide_1 > 7.0
manual_ide_1=np.extract(condition_manual_ide_1, manual_ide_1)
condition_manual_ide_1 = manual_ide_1 < 32.0
manual_ide_1=np.extract(condition_manual_ide_1, manual_ide_1)

manual_ide_2=np.random.normal(16.2, 15.0, 4000)
condition_manual_ide_2 = manual_ide_2 > 5.6
manual_ide_2=np.extract(condition_manual_ide_2, manual_ide_2)
condition_manual_ide_2 = manual_ide_2 < 25.0
manual_ide_2=np.extract(condition_manual_ide_2, manual_ide_2)

manual_ide_3=np.random.normal(15.4, 13.0, 4000)
condition_manual_ide_3 = manual_ide_3 > 4.9
manual_ide_3=np.extract(condition_manual_ide_3, manual_ide_3)
condition_manual_ide_3 = manual_ide_3 < 24.0
manual_ide_3=np.extract(condition_manual_ide_3, manual_ide_3)

manual_ide_4=np.random.normal(16.1, 12.0, 4000)
condition_manual_ide_4 = manual_ide_4 > 4.8
manual_ide_4=np.extract(condition_manual_ide_4, manual_ide_4)
condition_manual_ide_4 = manual_ide_4 < 24.0
manual_ide_4=np.extract(condition_manual_ide_4, manual_ide_4)

manual_ide_5=np.random.normal(13.0, 9.0, 4000)
condition_manual_ide_5 = manual_ide_5 > 4.5
manual_ide_5=np.extract(condition_manual_ide_5, manual_ide_5)
condition_manual_ide_5 = manual_ide_5 < 23.8
manual_ide_5=np.extract(condition_manual_ide_5, manual_ide_5)


manual_rnd_0=np.random.normal(32.2, 7.0, 4000)
condition_manual_rnd_0 = manual_rnd_0 > 28.8
manual_rnd_0=np.extract(condition_manual_rnd_0, manual_rnd_0)

manual_rnd_1=np.random.normal(15.2, 20.0, 4000)
condition_manual_rnd_1 = manual_rnd_1 > 7.0
manual_rnd_1=np.extract(condition_manual_rnd_1, manual_rnd_1)
condition_manual_rnd_1 = manual_rnd_1 < 31.0
manual_rnd_1=np.extract(condition_manual_rnd_1, manual_rnd_1)

manual_rnd_2=np.random.normal(16.2, 18.0, 4000)
condition_manual_rnd_2 = manual_rnd_2 > 4.0
manual_rnd_2=np.extract(condition_manual_rnd_2, manual_rnd_2)
condition_manual_rnd_2 = manual_rnd_2 < 30.0
manual_rnd_2=np.extract(condition_manual_rnd_2, manual_rnd_2)

manual_rnd_3=np.random.normal(15.3, 17.0, 4000)
condition_manual_rnd_3 = manual_rnd_3 > 3.5
manual_rnd_3=np.extract(condition_manual_rnd_3, manual_rnd_3)
condition_manual_rnd_3 = manual_rnd_3 < 28.0
manual_rnd_3=np.extract(condition_manual_rnd_3, manual_rnd_3)

manual_rnd_4=np.random.normal(8.4, 12.0, 4000)
condition_manual_rnd_4 = manual_rnd_4 > 3.4
manual_rnd_4=np.extract(condition_manual_rnd_4, manual_rnd_4)
condition_manual_rnd_4 = manual_rnd_4 < 23.4
manual_rnd_4=np.extract(condition_manual_rnd_4, manual_rnd_4)

manual_rnd_5=np.random.normal(7.0, 9.0, 4000)
condition_manual_rnd_5 = manual_rnd_5 > 3.0
manual_rnd_5=np.extract(condition_manual_rnd_5, manual_rnd_5)
condition_manual_rnd_5 = manual_rnd_5 < 20.0
manual_rnd_5=np.extract(condition_manual_rnd_5, manual_rnd_5)


np.savetxt("z_auto_0.csv", auto_0, delimiter=",")
np.savetxt("z_auto_1.csv", auto_1, delimiter=",")
np.savetxt("z_auto_2.csv", auto_2, delimiter=",")
np.savetxt("z_auto_3.csv", auto_3, delimiter=",")
np.savetxt("z_auto_4.csv", auto_4, delimiter=",")
np.savetxt("z_auto_5.csv", auto_5, delimiter=",")

np.savetxt("z_manual_ref_0.csv", manual_ref_0, delimiter=",")
np.savetxt("z_manual_ref_1.csv", manual_ref_1, delimiter=",")
np.savetxt("z_manual_ref_2.csv", manual_ref_2, delimiter=",")
np.savetxt("z_manual_ref_3.csv", manual_ref_3, delimiter=",")
np.savetxt("z_manual_ref_4.csv", manual_ref_4, delimiter=",")
np.savetxt("z_manual_ref_5.csv", manual_ref_5, delimiter=",")

np.savetxt("z_manual_ide_0.csv", manual_ide_0, delimiter=",")
np.savetxt("z_manual_ide_1.csv", manual_ide_1, delimiter=",")
np.savetxt("z_manual_ide_2.csv", manual_ide_2, delimiter=",")
np.savetxt("z_manual_ide_3.csv", manual_ide_3, delimiter=",")
np.savetxt("z_manual_ide_4.csv", manual_ide_4, delimiter=",")
np.savetxt("z_manual_ide_5.csv", manual_ide_5, delimiter=",")

np.savetxt("z_manual_rnd_0.csv", manual_rnd_0, delimiter=",")
np.savetxt("z_manual_rnd_1.csv", manual_rnd_1, delimiter=",")
np.savetxt("z_manual_rnd_2.csv", manual_rnd_2, delimiter=",")
np.savetxt("z_manual_rnd_3.csv", manual_rnd_3, delimiter=",")
np.savetxt("z_manual_rnd_4.csv", manual_rnd_4, delimiter=",")
np.savetxt("z_manual_rnd_5.csv", manual_rnd_5, delimiter=",")

"""

manual_rnd_0=np.random.normal(32.18, 7.1, 4000)
condition_manual_rnd_0 = manual_rnd_0 > 28.8
manual_rnd_0=np.extract(condition_manual_rnd_0, manual_rnd_0)

manual_rnd_1=np.random.normal(15.82, 16.10, 4000)
condition_manual_rnd_1 = manual_rnd_1 > 2.85
manual_rnd_1=np.extract(condition_manual_rnd_1, manual_rnd_1)
condition_manual_rnd_1 = manual_rnd_1 < 31.75
manual_rnd_1=np.extract(condition_manual_rnd_1, manual_rnd_1)

manual_rnd_2=np.random.normal(6.14, 10.90, 4000)
condition_manual_rnd_2 = manual_rnd_2 > 2.40
manual_rnd_2=np.extract(condition_manual_rnd_2, manual_rnd_2)
condition_manual_rnd_2 = manual_rnd_2 < 28.1
manual_rnd_2=np.extract(condition_manual_rnd_2, manual_rnd_2)

manual_rnd_3=np.random.normal(4.33, 9.5, 4000)
condition_manual_rnd_3 = manual_rnd_3 > 0.0
manual_rnd_3=np.extract(condition_manual_rnd_3, manual_rnd_3)
condition_manual_rnd_3 = manual_rnd_3 < 27.49
manual_rnd_3=np.extract(condition_manual_rnd_3, manual_rnd_3)

manual_rnd_4=np.random.normal(3.54, 7.4, 4000)
condition_manual_rnd_4 = manual_rnd_4 > 0.0
manual_rnd_4=np.extract(condition_manual_rnd_4, manual_rnd_4)
condition_manual_rnd_4 = manual_rnd_4 < 19.4
manual_rnd_4=np.extract(condition_manual_rnd_4, manual_rnd_4)

manual_rnd_5=np.random.normal(2.05, 6.70, 4000)
condition_manual_rnd_5 = manual_rnd_5 > 0.0
manual_rnd_5=np.extract(condition_manual_rnd_5, manual_rnd_5)
condition_manual_rnd_5 = manual_rnd_5 < 19.1
manual_rnd_5=np.extract(condition_manual_rnd_5, manual_rnd_5)

"""
manual_rnd_0=np.random.normal(1700.2, 1314.0, 4000)
condition_manual_rnd_0 = manual_rnd_0 > 1.98
manual_rnd_0=np.extract(condition_manual_rnd_0, manual_rnd_0)
manual_rnd_1=np.random.normal(738.1, 858.0, 4000)
condition_manual_rnd_1 = manual_rnd_1 > -14.74
manual_rnd_1=np.extract(condition_manual_rnd_1, manual_rnd_1)
manual_rnd_2=np.random.normal(158.2, 291.0, 4000)
condition_manual_rnd_2 = manual_rnd_2 > -23.05
manual_rnd_2=np.extract(condition_manual_rnd_2, manual_rnd_2)
manual_rnd_3=np.random.normal(8.65, 103.0, 4000)
condition_manual_rnd_3 = manual_rnd_3 > -38.40
manual_rnd_3=np.extract(condition_manual_rnd_3, manual_rnd_3)
manual_rnd_4=np.random.normal(-0.4, 62.0, 4000)
condition_manual_rnd_4 = manual_rnd_4 > -39.18
manual_rnd_4=np.extract(condition_manual_rnd_4, manual_rnd_4)
manual_rnd_5=np.random.normal(-1.2, 29.0, 4000)
condition_manual_rnd_5 = manual_rnd_5 > -42.05
manual_rnd_5=np.extract(condition_manual_rnd_5, manual_rnd_5)
"""

np.savetxt("z_manual_int_0.csv", manual_rnd_0, delimiter=",")
np.savetxt("z_manual_int_1.csv", manual_rnd_1, delimiter=",")
np.savetxt("z_manual_int_2.csv", manual_rnd_2, delimiter=",")
np.savetxt("z_manual_int_3.csv", manual_rnd_3, delimiter=",")
np.savetxt("z_manual_int_4.csv", manual_rnd_4, delimiter=",")
np.savetxt("z_manual_int_5.csv", manual_rnd_5, delimiter=",")

"""

y_rnd=[1603.4, 1622.2, 1636.1, 1603.3, 1622.1, 1612.4]
y_auto=[1670.4, 752.3, 184.2, 7.5, -0.2, -1.0]
y_manual_ref=[1613.5, 695.3, 37.1,-1.7, -5.3, -12.3]
y_manual_ide=[1605.6, 1074.3, 782.2, 516.4, 617.1, 478.0]
y_manual_rnd=[1687.2, 595.2, 603.0, 588.3, 348.4, 316.4]


rnd_0=np.random.normal(1603.4, 1205.0, 6000)
condition_rnd_0 = rnd_0 > 1.0
rnd_0=np.extract(condition_rnd_0, rnd_0)
rnd_1=np.random.normal(1622.2, 1225.0, 6000)
condition_rnd_1 = rnd_1 > 0.7
rnd_1=np.extract(condition_rnd_1, rnd_1)
rnd_2=np.random.normal(1636.1, 1425.0, 6000)
condition_rnd_2 = rnd_2 > 1.2
rnd_2=np.extract(condition_rnd_2, rnd_2)
rnd_3=np.random.normal(1603.3, 1525.0, 6000)
condition_rnd_3 = rnd_3 > 1.3
rnd_3=np.extract(condition_rnd_3, rnd_3)
rnd_4=np.random.normal(1622.1, 1125.0, 6000)
condition_rnd_4 = rnd_4 > -1.0
rnd_4=np.extract(condition_rnd_4, rnd_4)
rnd_5=np.random.normal(1612.4, 1325.0, 6000)
condition_rnd_5 = rnd_5 > -0.5
rnd_5=np.extract(condition_rnd_5, rnd_5)



auto_0=np.random.normal(1670.4, 1325.0, 4000)
condition_auto_0 = auto_0 > 1.0
auto_0=np.extract(condition_auto_0, auto_0)
auto_1=np.random.normal(752.3, 825.0, 4000)
condition_auto_1 = auto_1 > -11.0
auto_1=np.extract(condition_auto_1, auto_1)
auto_2=np.random.normal(184.2, 325.0, 4000)
condition_auto_2 = auto_2 > -19.0
auto_2=np.extract(condition_auto_2, auto_2)
auto_3=np.random.normal(7.5, 135.0, 4000)
condition_auto_3 = auto_3 > -25.0
auto_3=np.extract(condition_auto_3, auto_3)
auto_4=np.random.normal(-0.2, 25.0, 4000)
condition_auto_4 = auto_4 > -40.0
auto_4=np.extract(condition_auto_4, auto_4)
auto_5=np.random.normal(-1.0, 15.0, 4000)
condition_auto_5 = auto_5 > -45.0
auto_5=np.extract(condition_auto_5, auto_5)



manual_ref_0=np.random.normal(1613.5, 1025.0, 4000)
condition_manual_ref_0 = manual_ref_0 > 8.0
manual_ref_0=np.extract(condition_manual_ref_0, manual_ref_0)
manual_ref_1=np.random.normal(695.3, 525.0, 4000)
condition_manual_ref_1 = manual_ref_1 > -11.0
manual_ref_1=np.extract(condition_manual_ref_1, manual_ref_1)
manual_ref_2=np.random.normal(37.1, 105.0, 4000)
condition_manual_ref_2 = manual_ref_2 > -23.0
manual_ref_2=np.extract(condition_manual_ref_2, manual_ref_2)
manual_ref_3=np.random.normal(-1.7, 85.0, 4000)
condition_manual_ref_3 = manual_ref_3 > -28.0
manual_ref_3=np.extract(condition_manual_ref_3, manual_ref_3)
manual_ref_4=np.random.normal(-5.3, 12.0, 4000)
condition_manual_ref_4 = manual_ref_4 > -48.0
manual_ref_4=np.extract(condition_manual_ref_4, manual_ref_4)
manual_ref_5=np.random.normal(-1.0, 9.0, 4000)
condition_manual_ref_5 = manual_ref_5 > -60.0
manual_ref_5=np.extract(condition_manual_ref_5, manual_ref_5)


manual_ide_0=np.random.normal(1605.6, 1225.0, 4000)
condition_manual_ide_0 = manual_ide_0 > -4.0
manual_ide_0=np.extract(condition_manual_ide_0, manual_ide_0)
manual_ide_1=np.random.normal(1074.3, 975.0, 4000)
condition_manual_ide_1 = manual_ide_1 > -12.0
manual_ide_1=np.extract(condition_manual_ide_1, manual_ide_1)
manual_ide_2=np.random.normal(782.2, 505.0, 4000)
condition_manual_ide_2 = manual_ide_2 > -15.0
manual_ide_2=np.extract(condition_manual_ide_2, manual_ide_2)
manual_ide_3=np.random.normal(516.4, 385.0, 4000)
condition_manual_ide_3 = manual_ide_3 > -24.0
manual_ide_3=np.extract(condition_manual_ide_3, manual_ide_3)
manual_ide_4=np.random.normal(617.1, 212.0, 4000)
condition_manual_ide_4 = manual_ide_4 > -26.0
manual_ide_4=np.extract(condition_manual_ide_4, manual_ide_4)
manual_ide_5=np.random.normal(478.0, 199.0, 4000)
condition_manual_ide_5 = manual_ide_5 > -32.0
manual_ide_5=np.extract(condition_manual_ide_5, manual_ide_5)


manual_rnd_0=np.random.normal(1687.2, 1214.0, 4000)
condition_manual_rnd_0 = manual_rnd_0 > 2.0
manual_rnd_0=np.extract(condition_manual_rnd_0, manual_rnd_0)
manual_rnd_1=np.random.normal(595.2, 725.0, 4000)
condition_manual_rnd_1 = manual_rnd_1 > -11.0
manual_rnd_1=np.extract(condition_manual_rnd_1, manual_rnd_1)
manual_rnd_2=np.random.normal(603.2, 475.0, 4000)
condition_manual_rnd_2 = manual_rnd_2 > -13.0
manual_rnd_2=np.extract(condition_manual_rnd_2, manual_rnd_2)
manual_rnd_3=np.random.normal(588.3, 297.0, 4000)
condition_manual_rnd_3 = manual_rnd_3 > -18.0
manual_rnd_3=np.extract(condition_manual_rnd_3, manual_rnd_3)
manual_rnd_4=np.random.normal(348.4, 142.0, 4000)
condition_manual_rnd_4 = manual_rnd_4 > -28.0
manual_rnd_4=np.extract(condition_manual_rnd_4, manual_rnd_4)
manual_rnd_5=np.random.normal(316.4, 109.0, 4000)
condition_manual_rnd_5 = manual_rnd_5 > -30.0
manual_rnd_5=np.extract(condition_manual_rnd_5, manual_rnd_5)


"""

"""
rnd_0=np.array(rnd_0)
q75, q25 = np.percentile(rnd_0, [87.5 ,12.5])
print(min(rnd_0), q25, q75)
condition_rnd_0 = (rnd_0 >= q25) & (rnd_0 <= q75)
rnd_0_cat = np.extract(condition_rnd_0, rnd_0)


q75, q25 = np.percentile(rnd_1, [87.5 ,12.5])
condition_rnd_1 = (rnd_1 >= q25) & (rnd_1 <= q75)
rnd_1_cat = np.extract(condition_rnd_1, rnd_1)


q75, q25 = np.percentile(rnd_2, [87.5 ,12.5])
condition_rnd_2 = (rnd_2 >= q25) & (rnd_2 <= q75)
rnd_2_cat=np.extract(condition_rnd_2, rnd_2)


q75, q25 = np.percentile(rnd_3, [87.5 ,12.5])
condition_rnd_3 = (rnd_3 >= q25) & (rnd_3 <= q75)
rnd_3_cat=np.extract(condition_rnd_3, rnd_3)


q75, q25 = np.percentile(rnd_4, [87.5 ,12.5])
condition_rnd_4 = (rnd_4 >= q25) & (rnd_4 <= q75)
rnd_4_cat=np.extract(condition_rnd_4, rnd_4)


q75, q25 = np.percentile(rnd_5, [87.5 ,12.5])
condition_rnd_5 = (rnd_5 >= q25) & (rnd_5 <= q75)
rnd_5_cat=np.extract(condition_rnd_5, rnd_5)

q75, q25 = np.percentile(auto_0, [87.5 ,12.5])
condition_auto_0 = (auto_0 >= q25) & (auto_0 <= q75)
auto_0_cat = np.extract(condition_auto_0, auto_0)


q75, q25 = np.percentile(auto_1, [87.5 ,12.5])
condition_auto_1 = (auto_1 >= q25) & (auto_1 <= q75)
auto_1_cat = np.extract(condition_auto_1, auto_1)


q75, q25 = np.percentile(auto_2, [87.5 ,12.5])
condition_auto_2 = (auto_2 >= q25) & (auto_2 <= q75)
auto_2_cat=np.extract(condition_auto_2, auto_2)


q75, q25 = np.percentile(auto_3, [87.5 ,12.5])
condition_auto_3 = (auto_3 >= q25) & (auto_3 <= q75)
auto_3_cat=np.extract(condition_auto_3, auto_3)


q75, q25 = np.percentile(auto_4, [87.5 ,12.5])
condition_auto_4 = (auto_4 >= q25) & (auto_4 <= q75)
auto_4_cat=np.extract(condition_auto_4, auto_4)


q75, q25 = np.percentile(auto_5, [87.5 ,12.5])
condition_auto_5 = (auto_5 >= q25) & (auto_5 <= q75)
auto_5_cat=np.extract(condition_auto_5, auto_5)

q75, q25 = np.percentile(manual_ref_0, [87.5 ,12.5])
condition_manual_ref_0 = (manual_ref_0 >= q25) & (manual_ref_0 <= q75)
manual_ref_0_cat = np.extract(condition_manual_ref_0, manual_ref_0)


q75, q25 = np.percentile(manual_ref_1, [87.5 ,12.5])
condition_manual_ref_1 = (manual_ref_1 >= q25) & (manual_ref_1 <= q75)
manual_ref_1_cat = np.extract(condition_manual_ref_1, manual_ref_1)


q75, q25 = np.percentile(manual_ref_2, [87.5 ,12.5])
condition_manual_ref_2 = (manual_ref_2 >= q25) & (manual_ref_2 <= q75)
manual_ref_2_cat=np.extract(condition_manual_ref_2, manual_ref_2)


q75, q25 = np.percentile(manual_ref_3, [87.5 ,12.5])
condition_manual_ref_3 = (manual_ref_3 >= q25) & (manual_ref_3 <= q75)
manual_ref_3_cat=np.extract(condition_manual_ref_3, manual_ref_3)


q75, q25 = np.percentile(manual_ref_4, [87.5 ,12.5])
condition_manual_ref_4 = (manual_ref_4 >= q25) & (manual_ref_4 <= q75)
manual_ref_4_cat=np.extract(condition_manual_ref_4, manual_ref_4)


q75, q25 = np.percentile(manual_ref_5, [87.5 ,12.5])
condition_manual_ref_5 = (manual_ref_5 >= q25) & (manual_ref_5 <= q75)
manual_ref_5_cat=np.extract(condition_manual_ref_5, manual_ref_5)

q75, q25 = np.percentile(manual_ide_0, [87.5 ,12.5])
condition_manual_ide_0 = (manual_ide_0 >= q25) & (manual_ide_0 <= q75)
manual_ide_0_cat = np.extract(condition_manual_ide_0, manual_ide_0)


q75, q25 = np.percentile(manual_ide_1, [87.5 ,12.5])
condition_manual_ide_1 = (manual_ide_1 >= q25) & (manual_ide_1 <= q75)
manual_ide_1_cat = np.extract(condition_manual_ide_1, manual_ide_1)


q75, q25 = np.percentile(manual_ide_2, [87.5 ,12.5])
condition_manual_ide_2 = (manual_ide_2 >= q25) & (manual_ide_2 <= q75)
manual_ide_2_cat=np.extract(condition_manual_ide_2, manual_ide_2)


q75, q25 = np.percentile(manual_ide_3, [87.5 ,12.5])
condition_manual_ide_3 = (manual_ide_3 >= q25) & (manual_ide_3 <= q75)
manual_ide_3_cat=np.extract(condition_manual_ide_3, manual_ide_3)


q75, q25 = np.percentile(manual_ide_4, [87.5 ,12.5])
condition_manual_ide_4 = (manual_ide_4 >= q25) & (manual_ide_4 <= q75)
manual_ide_4_cat=np.extract(condition_manual_ide_4, manual_ide_4)


q75, q25 = np.percentile(manual_ide_5, [87.5 ,12.5])
condition_manual_ide_5 = (manual_ide_5 >= q25) & (manual_ide_5 <= q75)
manual_ide_5_cat=np.extract(condition_manual_ide_5, manual_ide_5)

q75, q25 = np.percentile(manual_rnd_0, [87.5 ,12.5])
condition_manual_rnd_0 = (manual_rnd_0 >= q25) & (manual_rnd_0 <= q75)
manual_rnd_0_cat = np.extract(condition_manual_rnd_0, manual_rnd_0)


q75, q25 = np.percentile(manual_rnd_1, [87.5 ,12.5])
condition_manual_rnd_1 = (manual_rnd_1 >= q25) & (manual_rnd_1 <= q75)
manual_rnd_1_cat = np.extract(condition_manual_rnd_1, manual_rnd_1)


q75, q25 = np.percentile(manual_rnd_2, [87.5 ,12.5])
condition_manual_rnd_2 = (manual_rnd_2 >= q25) & (manual_rnd_2 <= q75)
manual_rnd_2_cat=np.extract(condition_manual_rnd_2, manual_rnd_2)


q75, q25 = np.percentile(manual_rnd_3, [87.5 ,12.5])
condition_manual_rnd_3 = (manual_rnd_3 >= q25) & (manual_rnd_3 <= q75)
manual_rnd_3_cat=np.extract(condition_manual_rnd_3, manual_rnd_3)


q75, q25 = np.percentile(manual_rnd_4, [87.5 ,12.5])
condition_manual_rnd_4 = (manual_rnd_4 >= q25) & (manual_rnd_4 <= q75)
manual_rnd_4_cat=np.extract(condition_manual_rnd_4, manual_rnd_4)


q75, q25 = np.percentile(manual_rnd_5, [87.5 ,12.5])
condition_manual_rnd_5 = (manual_rnd_5 >= q25) & (manual_rnd_5 <= q75)
manual_rnd_5_cat=np.extract(condition_manual_rnd_5, manual_rnd_5)
"""

#draw plots