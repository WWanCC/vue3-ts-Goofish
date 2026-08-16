import { Migration } from '@mikro-orm/migrations';

export class Migration20260816143425 extends Migration {

  override name = 'Migration20260816143425';

  override up(): void | Promise<void> {
    this.addSql(`create table \`product\` (\`id\` int unsigned not null auto_increment primary key, \`title\` varchar(255) not null, \`price\` float not null, \`original_price\` float null, \`image_url\` varchar(255) not null, \`location\` varchar(255) not null, \`shipping_included\` tinyint(1) not null, \`service_tag\` varchar(255) null, \`attribute_text\` varchar(255) null, \`wanted_count\` int not null, \`seller_name\` varchar(255) not null, \`seller_avatar_url\` varchar(255) not null, \`seller_credit\` varchar(255) null) default character set utf8mb4 engine = InnoDB;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists \`product\`;`);
  }

}
