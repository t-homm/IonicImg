import { Component } from '@angular/core';
import { BlobServiceClient,ContainerClient} from '@azure/storage-blob';

const sasToken="?sv=2019-12-12&ss=bfqt&srt=co&sp=rwdlacupx&se=2021-01-05T14:47:37Z&st=2021-01-05T06:47:37Z&spr=https,http&sig=nGR2PRHxmnNyW8pNQx%2BH4PI2p2KBh0Qbas9%2Bi%2Fvgko4%3D"
const storageAccountName ="thonmargdiag";
const containerName = 'sample';
const blobService = new BlobServiceClient('https://${storageAccountName}.blob.core.windows.net/${sasToken}');
const containerClient: ContainerClient = blobService.getContainerClient(containerName);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    public imgs:string[] = [];
    public url : string;

    constructor() {}

    public async dl(){
        // List the blob(s) in the container.
        for await (const blob of containerClient.listBlobsFlat()) {
            console.log('\t',blob.name);
            this.url = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}${sasToken}`;
            
            this.imgs.unshift(this.url);
        }
    }

}
