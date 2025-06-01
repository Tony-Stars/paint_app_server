import axios from 'axios';
import { Service } from './service';
import { PreviewSize, YandexDiskIntegration } from './yandex-disk';

export class Controller {
    private service: Service;
    private yandexDiskIntegration: YandexDiskIntegration;

    public constructor(service: Service, yandexDiskIntegration: YandexDiskIntegration) {
        this.service = service;
        this.yandexDiskIntegration = yandexDiskIntegration;
    }

    root(req: any, res: any) {
        return res.status(200).json({ message: "Success" })
    }

    postImage(req: any, res: any) {
        try {
            const data = req.body.img;
            const sequence = req.query.sequence.toString();
            const version = req.query.version.toString();
            this.service.saveImage(sequence, version, data);
            return res.status(200).json({ message: "Загружено" })
        } catch (e) {
            console.log(e)
            return res.status(500).json('error')
        }
    }

    getImage(req: any, res: any) {
        try {
            const sequence = req.query.sequence.toString();
            const version = req.query.version.toString();
            const image = this.service.readImage(sequence, version);
            if (image !== null) {
                res.json(image)
            }

            res.status(404)
        } catch (e) {
            console.log(e)
            return res.status(500).json('error')
        }
    }

    getSequence(req: any, res: any) {
        try {
            const id = req.query.id.toString();
            const result = this.service.getSequence(id);
            return res.status(200).json(result)
        } catch (e) {
            console.log(e)
            return res.status(500).json('error')
        }
    }

    postSequence(req: any, res: any) {
        try {
            const id = req.query.id.toString();
            const result = this.service.addSequence(id);
            return res.status(200).json(result);
        } catch (e) {
            console.log(e)
            return res.status(500).json('error')
        }
    }

    putSequence(req: any, res: any) {
        try {
            const sequence = req.body.sequence.id;
            const version = req.body.image.version;
            const data = req.body.image.data;
            this.service.putSequence(sequence, version, data);
            return res.status(200).json({ message: "Обновлено" })
        } catch (e) {
            console.log(e)
            return res.status(500).json('error')
        }
    }

    yandex(req: any, res: any) {
        try {
            const uri = this.yandexDiskIntegration.codeToToken();
            // axios.get(uri).then((r) => {
            //     console.log(r);
            // }).catch((r) => {
            //     console.log(r);
            // })
            // this.yandexDiskIntegration.mock().then((r) => {
            //     // console.log(r);

            // }).catch((r) => {
            //     // console.log(r);

            // });
            // console.log(res1);
            return res.status(200).json({ message: "Обновлено" })
        } catch (e) {
            // console.log(e)
            return res.status(500).json('error')
        }
    }
}
