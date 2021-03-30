# MarvelComicSales

## Online

Apenas publiquei no cloudfront sem a criação de um domínimo.

Acesso: https://d1974dypfchgwg.cloudfront.net

<br/>

## Marvel Style

Para desenvolvimento do style, criei uma library com o grid-system do boostrap.
Assim evitei de usar angular material, e também consegui prover um layout mais otimizado somente com os componentes e bundles necessários.

Esta library carrega um json com cores no formato hexadecimal localizado em `assets/settings/theme/style.json`.

Este JSON também contém a configuração de font-family. A library inteira se modela á configuração desse JSON.

<br/>

O projeto contém:

- Buttons

Com opção de tipo primary, border, e cores success, white, question.

```
<marvel-button type="primary" color="success">
  Buy
</marvel-button>
```

- Icons

Renderização de icones em forma de svg direto no template do componente.
Possibilitando alterar o tamanho por meio de parametrização no conteúdo do svg.

```
<marvel-icon icon="arrow-left-20" color="#aaaaaa"></marvel-icon>
```

- Input

Componente de input utilizando reactive forms, com possibilidade de utilização da diretiva de mascara.

```
<marvel-input
  errorMessage="'Required'"
  formControlName="creditCardNumber"
  name="creditCardNumber"
  mask="0000 0000 0000 0000"
  [placeholder]="'Credit Card Number'"
>
</marvel-input>
```

- Modal

Componente para tratar o modal padrão do style.

```
modalService.open(SharedComicsRegisterComponent, {
      color: 'theme',
      size: 'md',
      title: `+ ${__i18n?.TITLES['ADD-COMIC']}`,
      action: {
        confirm: {
          actionColor: 'theme',
          actionType: 'primary',
          label: `+ ${__i18n?.BUTTONS['ADD-COMIC']}`,
        },
      },
    });
```

- Option

Componente para utilização junto ao select. Cada opção do select deve se um option.

- Progress

Componente com o progress padrão do style.

```
<marvel-progress></marvel-progress>
```

- Select

Componete com 2 variantes (select e select-search)

```
<marvel-select-search
  [placeholder]="'Character'"
  (onChange)="onChangeCharacters($event, true)"
  (onScrolled)="onScrolledCharacters($event)"
  (onSearch)="onSearchCharacters($event)"
  [showProgress]="true"
  fieldToCompare="id"
>
  <marvel-option [value]="character" [type]="'custom'" *ngFor="let character of _characters">
    <div class="d-flex just align-items-center character-option">
      <img [src]="character?.thumbnail?.resource" class="logo" width="65" height="65" />
      <span class="ml-3">
        {{ character?.name }}
      </span>
    </div>
  </marvel-option>
</marvel-select-search>
```

---

### Publicado no npm como:

https://www.npmjs.com/package/marvel-style

---

## Pipes

- MarvelFormatCurrency
  Para formatação de valores com base no i18n

- MarvelFormatDateTimelapse
  Para formatação de data com base no i18n

- MarvelTextTruncate
  Para truncar textos, como por exemplo na toolbar.

## Directives

- ngx-mask
  Para formatação do input como currency no marvel-style

## i18n

Utilizando serviço de tradução para todos os componentes e services.

## Decorators

Criados alguns decorators para definir o comportamento da request nos services, á qual é observada pelos interceptors, tratando assim a propriedade setada em cada decorator.

```
@MarvelCoreService({
  requestInProgress: {
    showProgress: true,
  },
})
```

## Database

Utilizei o firebase, com autênticação no google e facebook.

![Screen shot 1][screenshot1]

## Obs

Coloquei ação no botão comprar, mas sem muita validação pois o tempo estava curto, mas o resumo é informar os dados de pagamento e criar uma order listando na tela "My Orders"

![Screen shot 2][screenshot2]

## Final Thanks

Acho que é isso pessoal, projeto desenvolvido com a API da marvel para listagem de quadrinhos e firebase como base de dados.

See ya :)

[screenshot1]: https://user-images.githubusercontent.com/10110065/113006968-2fc65080-914c-11eb-957d-12dbf2a02a12.png
[screenshot2]: https://user-images.githubusercontent.com/10110065/113007779-e4607200-914c-11eb-8493-844d8385680a.png
