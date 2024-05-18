# Compactador Aritmético

## Trabalho da matéria Fundamentos de Sistemas Multimídia 24.1

| Alunos | Professora |
| ------ | ---------- |
| Rodrigo da Mota Sodre | Debora Christina Muchaluat Saade |
| Tamires da Hora dos Santos |

---
### O que é um compactador aritmético?


---
### Etapas de Compactação
1. Recebe Input
2. Separa blocos de Strings
3. **[inicio loop]** pega a primeira string do array
4. avalia a ocorrencia de cada caracter
5. seguindo a probabilidade de ocorrência encontra o valor codificado
6. informa o valor codificado junto com a tabela de ocorrencias
7. **[fim loop]** retira a string do array
---

### Problemas para resolver
- valor codificado precisa estar dentro dos limites usados em valor de ponto flutuantes de dupla precisão

![Descrição da Codificação Numérica](numberEncoding.png)

### Funções do Programa

<details>
<summary> script.js </summary>

| Funções Antigas | Descrição |
| ---- | ----- |
| ~~*HandleCompactar()*~~ | ~~Gerencia todo o processo de compactação da **mídia texto**.~~ |
| ~~*HandleDescompactar()*~~ | ~~Gerencia todo o processo de descompactação da **mídia texto**.~~ |
| ~~*VerifyAndSplitInput(frase)*~~ | ~~Verifica se o tamanho do input está dentro do limite e, caso não esteja, separa o mesmo em strings menores.~~ |
| ~~*FindProbabilites()*~~ | ~~Encontra a probabilidade de ocorrência de cada caracter dentro de uma string.~~ |

| Funções Atuais | Descrição |
| ---- | ----- |
| *GetInput()* | Retira o input do formulário em HTML e converte o valor da variável para string. |
| *ClearOutputField()* | Reinicializa as variáveis de input. |
| *SplitString(string)* | Verifica se o tamanho do input está dentro do limite e, caso não esteja, separa o mesmo em strings menores. |
| *HandleCompactar2()* | Gerencia todo o processo de compactação da **mídia texto** utilizando Classes js como forma de modularizar o código. |

</details>

<details>
<summary> Estrutura.js </summary>

| Funções Atuais | Descrição |
| ---- | ----- |
| *createTable()* | Cria a tabela de probabilidades para uma string. |
| *addUnidade(tipo, carac, min, max, extreme)* | Adiciona um elemento da classe Unidade a lista de caracteres de uma instancia de Estrutura. |
| *codificacao()* | Faz a codificação aritmética de uma string guardando os respectivos valores máximos e mínimos de cada caracter. |
| *codificaFinalValue()* | Recupera o valor codificado da string. |

</details>

<details>
<summary> Unidade.js </summary>

| Funções Atuais | Descrição |
| ---- | ----- |
| *defVal(minVal, maxVal)* | Defini um valor aleatório para um caracter (e, caso seja o último caracter da string, também para a string) a partir dos valores máximo e mínimo fornecidos. |

</details>
