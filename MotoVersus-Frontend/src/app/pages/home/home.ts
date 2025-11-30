import { Component} from '@angular/core';
import { CommentsComponent } from '../../components/comment/comment';
import { CommentCreate } from '../../components/comment-create/comment-create';
//1. importar la clase del componente y agregar a los componentes


@Component({
  selector: 'app-home',
  imports: [ CommentsComponent, CommentCreate],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
