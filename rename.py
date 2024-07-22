import os

# 文件夹路径
folder_path = '/Users/xdl/Desktop/image/'

# 获取文件夹中的所有文件
files = os.listdir(folder_path)

for file_name in files:
    # 检查文件是否是.png格式
    if file_name.endswith('.png'):
        # 提取文件编号
        num_str = file_name.replace('.png', '')
        print(f'原文件名: {file_name} -> 文件编号: {num_str}')  # 打印文件名和编号
        
        try:
            # 转换成整数以去除前导零
            num = int(num_str)
            # 格式化新文件名
            new_file_name = f'{num % 1000:03d}.png'  # 使用 % 1000 确保编号不超过三位数
            # 获取旧文件路径和新文件路径
            old_file_path = os.path.join(folder_path, file_name)
            new_file_path = os.path.join(folder_path, new_file_name)
            # 重命名文件
            if old_file_path != new_file_path:
                os.rename(old_file_path, new_file_path)
                print(f'文件 {old_file_path} 已重命名为 {new_file_path}')
            else:
                print(f'文件 {old_file_path} 名称未改变')
        except ValueError:
            print(f'文件名 {file_name} 无法转换为整数')

print("文件重命名完成")
