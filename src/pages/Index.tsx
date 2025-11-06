import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface GamePack {
  id: number;
  title: string;
  description: string;
  price: number;
  games: number;
  rating: number;
  category: string;
  image: string;
}

interface Purchase {
  id: number;
  packTitle: string;
  date: string;
  price: number;
}

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const gamePacks: GamePack[] = [
    {
      id: 1,
      title: 'AAA Games Collection',
      description: 'Лучшие AAA-игры текущего поколения',
      price: 2499,
      games: 15,
      rating: 4.9,
      category: 'premium',
      image: '🎮'
    },
    {
      id: 2,
      title: 'Indie Masterpieces',
      description: 'Культовые инди-игры со всего мира',
      price: 1299,
      games: 25,
      rating: 4.8,
      category: 'indie',
      image: '🌟'
    },
    {
      id: 3,
      title: 'Racing Ultimate',
      description: 'Полная коллекция гоночных симуляторов',
      price: 1799,
      games: 12,
      rating: 4.7,
      category: 'racing',
      image: '🏎️'
    },
    {
      id: 4,
      title: 'Strategy Empire',
      description: 'Стратегии для истинных тактиков',
      price: 1599,
      games: 18,
      rating: 4.8,
      category: 'strategy',
      image: '⚔️'
    },
    {
      id: 5,
      title: 'Horror Collection',
      description: 'Самые страшные игры для смелых',
      price: 1399,
      games: 10,
      rating: 4.6,
      category: 'horror',
      image: '👻'
    },
    {
      id: 6,
      title: 'RPG Legends',
      description: 'Легендарные ролевые приключения',
      price: 2199,
      games: 20,
      rating: 4.9,
      category: 'rpg',
      image: '🐉'
    }
  ];

  const userPurchases: Purchase[] = [
    { id: 1, packTitle: 'AAA Games Collection', date: '15.10.2024', price: 2499 },
    { id: 2, packTitle: 'Indie Masterpieces', date: '02.10.2024', price: 1299 }
  ];

  const handleLogin = () => {
    if (email && password) {
      setIsAuthenticated(true);
      setActiveTab('profile');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-3xl">🎮</div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              GAME STORE
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('home')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Главная
            </button>
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'catalog' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Каталог
            </button>
            <button 
              onClick={() => setActiveTab('support')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'support' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Поддержка
            </button>
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setActiveTab('profile')}
                  className="gap-2"
                >
                  <Icon name="User" size={18} />
                  Профиль
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                >
                  Выход
                </Button>
              </>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    <Icon name="LogIn" size={18} />
                    Войти
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Вход в аккаунт</DialogTitle>
                    <DialogDescription>
                      Войдите, чтобы получить доступ к покупкам
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="gamer@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Пароль</Label>
                      <Input 
                        id="password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-primary to-secondary">
                    Войти
                  </Button>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </header>

      <main className="container py-8">
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fade-in">
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 p-12 text-center">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
              <div className="relative z-10 space-y-6">
                <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-glow">
                  ИГРОВЫЕ СБОРКИ
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                  Эксклюзивные коллекции лучших игр по выгодным ценам
                </p>
                <Button 
                  size="lg" 
                  className="gap-2 bg-gradient-to-r from-primary to-secondary text-lg px-8 py-6 hover:scale-105 transition-transform"
                  onClick={() => setActiveTab('catalog')}
                >
                  <Icon name="Gamepad2" size={24} />
                  Смотреть каталог
                </Button>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold">🔥 Популярные сборки</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gamePacks.slice(0, 3).map((pack) => (
                  <Card key={pack.id} className="group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 border-border/50 bg-card/50 backdrop-blur">
                    <CardHeader>
                      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{pack.image}</div>
                      <CardTitle className="text-xl">{pack.title}</CardTitle>
                      <CardDescription>{pack.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Icon name="Package" size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">{pack.games} игр</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{pack.rating}</span>
                        </div>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        {pack.category}
                      </Badge>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">{pack.price} ₽</span>
                      <Button className="gap-2 bg-gradient-to-r from-primary to-secondary">
                        <Icon name="ShoppingCart" size={18} />
                        Купить
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-4xl font-bold mb-2">Каталог сборок</h2>
              <p className="text-muted-foreground">Выберите идеальную коллекцию игр</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gamePacks.map((pack) => (
                <Card key={pack.id} className="group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{pack.image}</div>
                    <CardTitle className="text-xl">{pack.title}</CardTitle>
                    <CardDescription>{pack.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="Package" size={16} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{pack.games} игр</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{pack.rating}</span>
                      </div>
                    </div>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {pack.category}
                    </Badge>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">{pack.price} ₽</span>
                    <Button className="gap-2 bg-gradient-to-r from-primary to-secondary">
                      <Icon name="ShoppingCart" size={18} />
                      Купить
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl">
                👤
              </div>
              <div>
                <h2 className="text-3xl font-bold">{email || 'Геймер'}</h2>
                <p className="text-muted-foreground">Игровой аккаунт</p>
              </div>
            </div>

            <Tabs defaultValue="purchases" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="purchases">Мои покупки</TabsTrigger>
                <TabsTrigger value="settings">Настройки</TabsTrigger>
              </TabsList>
              
              <TabsContent value="purchases" className="space-y-4">
                {userPurchases.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Icon name="ShoppingBag" size={48} className="text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">У вас пока нет покупок</p>
                      <Button 
                        className="mt-4"
                        onClick={() => setActiveTab('catalog')}
                      >
                        Перейти в каталог
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  userPurchases.map((purchase) => (
                    <Card key={purchase.id}>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>{purchase.packTitle}</CardTitle>
                          <CardDescription>Куплено {purchase.date}</CardDescription>
                        </div>
                        <Badge variant="outline" className="border-primary text-primary">
                          {purchase.price} ₽
                        </Badge>
                      </CardHeader>
                      <CardFooter>
                        <Button className="gap-2">
                          <Icon name="Download" size={18} />
                          Скачать
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Настройки аккаунта</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="profile-email">Email</Label>
                      <Input id="profile-email" value={email} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Новый пароль</Label>
                      <Input id="new-password" type="password" placeholder="••••••••" />
                    </div>
                    <Button>Сохранить изменения</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div>
              <h2 className="text-4xl font-bold mb-2">Поддержка</h2>
              <p className="text-muted-foreground">Ответы на частые вопросы</p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg">
                  Как купить игровую сборку?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Выберите понравившуюся сборку в каталоге, нажмите "Купить" и следуйте инструкциям. После оплаты игры сразу появятся в вашем личном кабинете.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg">
                  Какие способы оплаты доступны?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Принимаем банковские карты, электронные кошельки, СБП и криптовалюту. Все платежи защищены и обрабатываются мгновенно.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg">
                  Как скачать купленные игры?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  В личном кабинете в разделе "Мои покупки" нажмите кнопку "Скачать" напротив нужной сборки. Получите прямую ссылку на загрузку или инструкции по активации.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg">
                  Можно ли вернуть деньги?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Возврат возможен в течение 14 дней после покупки, если вы не начали скачивание. Обратитесь в поддержку для оформления возврата.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg">
                  Что делать, если игра не запускается?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Проверьте системные требования и обновите драйверы видеокарты. Если проблема сохраняется, напишите в поддержку с описанием ошибки.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MessageCircle" size={24} />
                  Не нашли ответ?
                </CardTitle>
                <CardDescription>Свяжитесь с нами напрямую</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={20} className="text-primary" />
                  <span>support@gamestore.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={20} className="text-primary" />
                  <span>+7 (800) 555-35-35</span>
                </div>
                <Button className="w-full gap-2 bg-gradient-to-r from-primary to-secondary">
                  <Icon name="Send" size={18} />
                  Написать в поддержку
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t border-border/40 mt-20">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="text-2xl">🎮</div>
              <span className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GAME STORE
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Game Store. Все права защищены.
            </p>
            <div className="flex gap-4">
              <button className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Github" size={20} />
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Twitter" size={20} />
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="MessageCircle" size={20} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;