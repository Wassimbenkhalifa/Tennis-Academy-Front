import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';
import {Publication} from '../publication.model';
import {PublicationService} from '../publication.service';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.sass']
})
export class PublicationComponent implements OnInit {
  @ViewChild('dynamic', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;

  public publication: Publication;
  publications$: Observable<Publication[]>;

  COMMENTS_REF: string = "publications";
  COL_NODE: string;

  viewReply: string;
  editComment: string;

  constructor(private publicationService: PublicationService) {
    this.publication = new Publication();
    this.viewReply = "";
  }

  ngOnInit() {
    //this.COL_NODE = `${this.publication.docPath}/${this.COMMENTS_REF}`;
    //this.publications$ = this.fbService.colWithIds$(this.COL_NODE, ref => ref.orderBy('date', 'desc'));
    this.publications$ = this.publicationService.getAllPublications();

  }

  onComment(comment: Comment) {
    // this.fbService.add(comment, this.COL_NODE)
    //   .then(_ => {
    //     this.comment = new Comment();
    //   })
  }

  onEdit(comment: Comment) {
    // this.fbService.update(comment.docPath, comment)
    //   .then(_ => {
    //     this.editComment = "";
    //   })
  }

  onDelete(comment: Comment) {
    // this.fbService.delete(comment.docPath);
  }

  onViewReply(comment: Comment) {
    // this.dynComponent.addDynamicComponent(this.viewContainerRef, comment);
  }

}
