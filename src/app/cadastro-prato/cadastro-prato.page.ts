import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


interface Ingrediente {
  id: string;
  nome: string;
  preco_unitario: number;
}

interface IngredienteDoPrato {
  ingrediente: Ingrediente;
  quantidade: number;
}

@Component({
  selector: 'app-cadastro-prato',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './cadastro-prato.page.html',
  styleUrls: ['./cadastro-prato.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // 👈 Adicione esta linha
})
export class CadastroPratoPage implements OnInit {

  ingredientesCadastrados: Ingrediente[] = [];
  ingredientesDoPrato: IngredienteDoPrato[] = [];

  ingredienteSelecionado: Ingrediente | null = null;
  quantidadeIngrediente: number | null = null;

  prato = {
    nome: '',
    descricao: '',
    categoria: '',
    precoVenda: 0
  };

  custoTotal: number = 0;
  lucroEstimado: number = 0;
  margemLucro: number = 0;

  ngOnInit() {
    // Simula busca ingredientes cadastrados (substituir por chamada ao backend)
    this.ingredientesCadastrados = [
      { id: '1', nome: 'Arroz', preco_unitario: 5.00 },
      { id: '2', nome: 'Feijão', preco_unitario: 6.50 },
      { id: '3', nome: 'Carne', preco_unitario: 20.00 },
    ];
  }

  adicionarIngrediente() {
    if (this.ingredienteSelecionado && this.quantidadeIngrediente && this.quantidadeIngrediente > 0) {
      const idx = this.ingredientesDoPrato.findIndex(i => i.ingrediente.id === this.ingredienteSelecionado!.id);
      if (idx > -1) {
        this.ingredientesDoPrato[idx].quantidade += this.quantidadeIngrediente;
      } else {
        this.ingredientesDoPrato.push({
          ingrediente: this.ingredienteSelecionado,
          quantidade: this.quantidadeIngrediente
        });
      }
      this.ingredienteSelecionado = null;
      this.quantidadeIngrediente = null;

      this.calcularCusto();
      this.calcularLucro();
    }
  }

  removerIngrediente(index: number) {
    this.ingredientesDoPrato.splice(index, 1);
    this.calcularCusto();
    this.calcularLucro();
  }

  editarIngrediente(index: number) {
    const ing = this.ingredientesDoPrato[index];
    this.ingredienteSelecionado = ing.ingrediente;
    this.quantidadeIngrediente = ing.quantidade;
    this.removerIngrediente(index);
  }

  calcularCusto() {
    this.custoTotal = this.ingredientesDoPrato.reduce((total, item) => {
      return total + (item.ingrediente.preco_unitario * item.quantidade / 100);
    }, 0);
  }

  calcularLucro() {
    this.lucroEstimado = this.prato.precoVenda - this.custoTotal;
    this.margemLucro = this.custoTotal > 0 ? (this.lucroEstimado / this.custoTotal) * 100 : 0;
  }

  salvarPrato() {
    if (!this.prato.nome || this.ingredientesDoPrato.length === 0) return;

    console.log('Salvando prato:', this.prato, this.ingredientesDoPrato);

    this.prato = { nome: '', descricao: '', categoria: '', precoVenda: 0 };
    this.ingredientesDoPrato = [];
    this.custoTotal = 0;
    this.lucroEstimado = 0;
    this.margemLucro = 0;
  }
}
