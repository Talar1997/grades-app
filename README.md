# Grades

## Postman docs
https://documenter.getpostman.com/view/9501404/TWDZJGjq

## Założenia

Napisz aplikację dziennika lekcyjnego. Aplikacja składa się z dwóch modułów:
- moduły sprawdzania obecności
- modułu wpisywania ocen

Z aplikacji korzystać może wielu nauczycieli, każdy z nich może prowadzić wiele przedmiotów (np. nauczyciel x oraz y prowadzą zajęcia z matematyki). Nauczyciel podczas tworzenia nowego kursu podaje jego nazwę oraz wpisuje dane uczniów (imię i nazwisko). Wpisuje także datę rozpoczynających się zajęć, które (dla uproszczenia) odbywają się cyklicznie. Aplikacja powinna umożliwiać sprawdzenie obecności na danych zajęciach (dowolność oznakowania obecności i nieobecności). Nauczyciel w dowolnym momencie ma możliwość sprawdzenia historii obecności uczniów na zajęciach które już się odbyły.

### Moduł wpisywania ocen

Nauczyciel wpisuje formy sprawdzania wiedzy (np. kartkówki, sprawdziany, odpowiedzi ustne) oraz ma możliwość wpisywania ocen. Ocena końcowa jest średnią z wszystkich form sprawdzających. System powinien zezwalać na poprawę wcześniej dodanych ocen.

### Na ocenę bardzo dobrą:
Wprowadź możliwość dodania wagi dla konkretnej formy sprawdzania wiedzy (wszystkie kartkówki mają łączną wagę 50% a jeden końcowy sprawdzian również posiada wagę 50%). Jeżeli student ma 100% obecność na zajęciach anuluje się jedną kartkówkę z której miał najsłabszą ocenę.
