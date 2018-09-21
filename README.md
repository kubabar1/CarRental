<img src="https://github.com/kubabar1/CarRental/blob/master/CarRental/src/main/webapp/static/img/car_rental_logo_name.png" width="400"/>

# 1. Opis ogólny
## 1.1 Nazwa programu
*CarRental*

## 1.2 Cel aplikacji
Głównym celem stworzenia tej aplikacji było wykorzystanie w praktyce dotychczas zgromadzonej przeze mnie wiedzy na temat tworzenia 
bazodanowych restowych aplikacji z wykorzystaniem Springa.
</br></br>
Celem programu *CarRental* jest obsługa firmy wypożyczającej auta. Głównym zadaniem aplikacji jest umożliwienie przejrzenia listy aut 
oraz ich szegółów przez klientów, a następnie rezerwacji wybranego auta. Aplikacja posiada również panel klienta umożliwiający 
przeglądanie zamówień oraz zmianę ustawień konta, oraz panel administratora umożliwiający m.in. administrowanie zamówieniami oraz 
użytkownikami, dodawanie i edycję aut, edycję wyposażenia aut. Aplikacja posiada również system logowania oraz rejestracji nowych 
klientów.

## 1.3 Krótkie wstępne podsumowanie aplikacji

### Backend:
Restowe API napisane w Springu z wykorzystaniem następujących technologii:

<ul>
  <li>Spring MVC</li>
  <li>Spring Security</li>
  <li>Spring Data JPA</li>
  <li>Hibernate</li>
</ul>
W sumie projekt składa się z 8 pakietów, 83 klas które łącznie mają ok. 5000  linii kodu.

### Frontend:
Frontend został głównie napisany z wykorzystaniem Reacta. Technologię Thymeleaf wykorzystałem do stworzenia panelu logowania, 
rejestracji oraz jako podstawę do głównej strony projektu oraz panelu użytkownika. W sumie przy tworzeniu frontendu wykorzystałem 
następujące technologie:

<ul>
  <li>React, React Router</li>
  <li>Thymeleaf</li>
  <li>Bootstrap</li>
  <li>HTML, CSS</li>
  <li>npm, webpack</li>
</ul>




W sumie frontend składa się ze 101 plików, które w sumie liczą ok. 8000 linii kodu. 

## 1.4 Docelowi użytkownicy

<ul>
  <li><b>Admin</b> - osoba zarządzająca stroną posiadająca najwięcej uprawnień</li>
  <li><b>Customer</b> - klient, osoba korzystająca z naszej strony w celu rezerwacji auta, każdy użytkownik który zakłada konto posiada
    początkowo rolę klienta, pozostałe role są przypisywane przez admina
  </li>
  <li><b>Renting employee</b> - osoba wypożyczająca auta, ma m.in uprawnienia do zarządzania wszystkimi zamówieniami</li>
  <li><b>Office employee</b> - osoba pracująca na stanowisku biurowym</li>
</ul>

# 2. Opis funkcjonalności

## 2.1 Uruchomienie

### Do uruchomienia potrzebne będą:
<ul>
  <li>serwer MySQL (można go pobrać poleceniem <i>sudo apt-get install mysql-server</i>),</li>
  <li>Maven (można go pobrać poleceniem <i>sudo apt-get install maven</i>),</li>
  <li>Tomcat (należy później skonfigurować użytkowników i nadać im odpowiednie prawa)</li>
</ul>

</br>

### W celu uruchomienia projektu należy wykonać następujące kroki:
1.	Sklonuj repozytorium: https://github.com/kubabar1/CarRental.git
```
  git clone https://github.com/kubabar1/CarRental.git
```

2.	Używając skryptu bazy danych o nazwie carrental.sql znajdującego się <a href="https://github.com/kubabar1/CarRental/blob/master/carrental.sql">tutaj</a> 
utwórz bazę danych na serwerze MySQL. Aby zainstalować bazę danych należy wpisać poniższą komendę:
```
   sudo mysql –u root < carrental.sql
```

Polecenie to spowoduje usunięcie istniejącej bazy danych o nazwie carrental (jeżeli istnieje) i utworzenie nowej wraz z tabelami i wpisanymi do nich wartościami. 
!!! bardzo istotne jest to, aby w naszej bazie danych znajdował się użytkownik root, nie posiadający hasła, jeżeli jednak jest ustawione hasło, należy je wpisać w następującym pliku 
3.	Przejdż do katalogu w projekcie w którym znajduje się plik pom.xml i wykonaj następujące polecenie:
 ```
   sudo mvn clean install
```
 
*sudo* jest konieczne ze względu na fakt, że Maven tworzy w folderze głównym systemu folder w którym wypakowuje część zdjęć 
wykorzystywanych w aplikacji oraz w którym są przechowywane m.in. zdjęcia dodanych przez nas aut.

4.	Po zakończeniu działania programu Maven należy przejść do folderu *CarRental/target i skopiować plik CarRental.war do folderu 
*webapps* naszego serwera *Tomcat* (np. dla serwera Tomcat 8 będzie to folder *tomcat8/webapps*).

5.	Edytujemy konfigurację w pliku tomcat/conf/server.xml:
a)	Dla systemu Windows
```
  <Context docBase="C:\carrental\img\vehicles_img" path="/CarRental/vehicles-img"/>
  <Context docBase="C:\carrental\img\etc_img" path="/CarRental/etc-img"/>
```
    
b)	Dla systemu Linux: 
```
  <Context docBase="/carrental/img/vehicles_img" path="/CarRental/vehicles-img"/>
  <Context docBase="/carrental/img/etc_img" path="/CarRental/etc-img"/>
```
    
Dzięki temu nasza aplikacja będzie mogła mieć dostęp do zdjęć przechowywanych na dysku.

6.	Uruchamiamy serwer poleceniem (dla wersji serwera Tomcat 8): 
```
  sudo service tomcat8 start 
```

7.	Wpisujemy w przegladarce adres *http://localhost:8080/CarRental*







