import * as express from 'express';
import exceptionErr from './middlewares/exceptions';
import userRouter from './routes/UserRouter';
import TeamRouter from './routes/TeamRouter';
import matchRouter from './routes/MatchRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.router();

    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use(exceptionErr);
  }

  private router(): void {
    this.app.use(userRouter);
    this.app.use('/teams', TeamRouter);
    this.app.use('/matches', matchRouter);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
