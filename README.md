
# Upplýsingar um verkefni #

## Keyrsla ##

Til að keyra verkefnið þarf að gera eftirfarandi skipanir:

```bash
npm install
npm run dev
```

Til að keyra stylelint og eslint þarf:

```bash
npm run test
```

## Skipulag ##

### HTML ###

Vefsíðunni er skipt upp í eftirfarandi html skjöl:

* _index.html_
    * Þangað koma inn yfirlitsgögn yfir fyrirlestra
    * Hefur harðkóðaða takka til að sía gögn eftir flokki, þ.e. CSS, HTML eða JavaScript
* _fyrirlestur.html_
    * Þangað koma inn sértæk gögn fyrir hvern fyrilestur fyrir sig

Bæði skjölin eru í aðalmöppu verkefnisins. 

Header er harðkóðaður í index.html, en fæst í gegnum javascript að mestu í fyrirlestur.html.

### CSS/SCSS ###

styles.css heldur utan um allt útlit og er inni í dist möppunni. Útlitinu er annars skipt upp í nokkrar scss skrár sem má finna inni í src/styles möppunni. Þær eru eftirfarandi:

* _styles.scss_
    * Heldur utan um útlit á breytum sem sameiginlegar eru báðum html skjölum.
* _forsida.scss_
    * Sér um útlit á yfirlitssíðu fyrirlestra
* _fyrirlestrar.scss_
    * Sér um útlit á sérhverri fyrirlestrarsíðu
* _config.scss_
    * Inniheldur nokkrar breytur og föll sem nýtast í öllum scss skjölunum

### JavaScript ###

Javascript skrárnar eru flestar inni í src/lib möppunni, en index.js er bara beint inni í src. Hér koma nánari upplýsingar um hverja skrá:

* _index.js_ 
    * Er keyrð þegar vefsíðan keyrir, og býr ýmist til Lecture hlut og loadar viðkomandi fyrirlestri, eða List hlut og loadar forsíðunni/fyrirlestrayfirlitinu, eftir því hvað við á.
* _list.js_ 
    * Hleður inn fyrirlestrayfirlitsgögnum og birtir þau á viðeigandi hátt, sem thumbnails með flokk og titil sem er tengill yfir á viðkomandi fyrirlestur.
    * Sér um virkni á síutökkum efst þar sem hægt er að velja að birta fyrirlestra úr ákveðnum flokki/flokkum.
* _lecture.js_ 
    * Hleður inn gögnum fyrir ákveðinn fyrirlestur og birtir sérhverja gerð gagna á viðeigandi hátt. 
    * Birtir einnig viðeigandi content í header eftir því hvaða fyrirlestur er um að ræða.
    * Sér um "Klára fyrirlestur" virknina og vistar eða fjarlægir kláraða/afkláraða fyrirlestra úr localStorage.
* _converter.js_ 
    * Hjálparskjal sem inniheldur föll sem sjá um að búa til element fyrir hverja gerð gagna jafnt á fyrirlestrar- sem og yfirlitssíðu.
* _storage.js_ 
    * Sér um að sækja, vista og fjarlægja gögn úr localStorage. Sér helst um vistaða fyrirlestra, en er einnig nýtt til að ákvarða hvaða fyrirlestra skal birta í síunni á yfirlitssíðu.
* _helpers.js_ 
    * Inniheldur tvö lítil hjálparföll sem nýtast hér og þar, við að búa til nýtt element og til að tæma containers.

### Annað ###

* Allar myndir sem notaðar eru í verkefninu eru í möppunni img
* node_modules inniheldur uppsett npm tæki og tól
* package.json inniheldur scripts til að keyra tól eins og sass-watch og stylelint
* eslintrc.js inniheldur reglur fyrir eslint, þ.e. uppsetningu á JavaScript skjölum
* .stylelintrc inniheldur reglur fyrir stylelint, þ.e. uppsetningu á scss skjölum.
* rollup.config.js inniheldur leiðbeiningar/upplýsingar fyrir babel og rollup

## Hönnuðir ##

* _Sunna Björnsdóttir_
    * Tölvupóstfang: sub4@hi.is
    * JavaScript
* _Auður Margrét Pálsdóttir_
    * Tölvupóstfang: amp16@hi.is
    * CSS og HTML
* _Katla Rún Ísfeld_
    * Tölvupóstfang: kri9@hi.is
    * CSS og HTML



