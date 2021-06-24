import * as moment from 'moment';

export class Lancamento {
  codigo: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
  anexo: string;
  urlAnexo: string;

  static toJson(lancamento: Lancamento): any {

    if (!(lancamento.dataVencimento.toString().indexOf('/') > 0) && !lancamento.dataPagamento) {
      return {
        ...lancamento,
        dataVencimento: moment(lancamento.dataVencimento).format('DD/MM/YYYY')
      };
    } else if (!(lancamento.dataVencimento.toString().indexOf('/') > 0)
        && !(lancamento.dataPagamento.toString().indexOf('/') > 0)) {
          return {
            ...lancamento,
            dataVencimento: moment(lancamento.dataVencimento).format('DD/MM/YYYY'),
            dataPagamento: moment(lancamento.dataPagamento).format('DD/MM/YYYY')
          };
    }
    if (lancamento.dataPagamento && !(lancamento.dataPagamento.toString().indexOf('/') > 0)) {
      return {
        ...lancamento,
        dataPagamento: moment(lancamento.dataPagamento).format('DD/MM/YYYY')
      };
    } else if (!(lancamento.dataVencimento.toString().indexOf('/') > 0)
        && lancamento.dataPagamento) {
      return {
        ...lancamento,
        dataVencimento: moment(lancamento.dataVencimento).format('DD/MM/YYYY')
      };
    }

    return {
      ...lancamento
    };
  }
}

export class Pessoa {
  codigo: number;
  nome: string;
  ativo = true;
  endereco = new Endereco();
  contatos = new Array<Contato>();
}

export class Categoria {
  codigo: number;
  nome: string;
}

export class Endereco {
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: number;
  cidade = new Cidade();
}

export class Estado {
  codigo: number;
  nome: string;
}

export class Cidade {
  codigo: number;
  nome: string;
  estado = new Estado();
}

export class Usuario {
  codigo: number;
  nome: string;
  email: string;
  senha: string;
  permissoes: Permissao[];
}

export class Permissao {
  codigo: number;
  descricao: string;
}

export class Contato {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;

  constructor(codigo?: number, nome?: string, email?: string, telefone?: string) {
    this.codigo = codigo;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }
}
